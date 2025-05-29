import { Box } from "@mui/material";
import { useState, useRef, useCallback } from "react";

import lang from "lang";

import type { IDocumentPrintParamsCopyPosition } from ".";

interface IProps {
    url: string;
    onCopyPosition?: (position: IDocumentPrintParamsCopyPosition) => void;
}

interface IDrawingState {
    isDrawing: boolean;
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
}

interface ILastDrawnRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export default function DocumentPrintParamsImageExample({ url, onCopyPosition }: IProps) {
    const langPage = lang.components.documentPrintParams;
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [drawingState, setDrawingState] = useState<IDrawingState>({
        isDrawing: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
    });
    const [lastDrawnRect, setLastDrawnRect] = useState<ILastDrawnRect | null>(null);

    /**
     * Получает координаты мыши относительно изображения
     */
    const getRelativeCoordinates = useCallback((event: React.MouseEvent) => {
        if (!containerRef.current) return { x: 0, y: 0 };

        const rect = containerRef.current.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    }, []);

    /**
     * Начало рисования прямоугольника
     */
    const onMouseDown = useCallback(
        (event: React.MouseEvent) => {
            const coords = getRelativeCoordinates(event);
            setDrawingState({
                isDrawing: true,
                startX: coords.x,
                startY: coords.y,
                currentX: coords.x,
                currentY: coords.y,
            });
            // Очищаем предыдущий нарисованный прямоугольник при начале нового
            setLastDrawnRect(null);
        },
        [getRelativeCoordinates]
    );

    /**
     * Процесс рисования прямоугольника
     */
    const onMouseMove = useCallback(
        (event: React.MouseEvent) => {
            if (!drawingState.isDrawing) return;

            const coords = getRelativeCoordinates(event);
            setDrawingState((prev) => ({
                ...prev,
                currentX: coords.x,
                currentY: coords.y,
            }));
        },
        [drawingState.isDrawing, getRelativeCoordinates]
    );

    /**
     * Завершение рисования прямоугольника
     */
    const onMouseUp = useCallback(() => {
        if (!drawingState.isDrawing) return;

        const x = Math.min(drawingState.startX, drawingState.currentX);
        const y = Math.min(drawingState.startY, drawingState.currentY);
        const width = Math.abs(drawingState.currentX - drawingState.startX);
        const height = Math.abs(drawingState.currentY - drawingState.startY);

        // Проверяем что прямоугольник имеет минимальный размер
        if (width > 5 && height > 5) {
            const position: IDocumentPrintParamsCopyPosition = {
                x: Math.round(x),
                y: Math.round(y),
                width: Math.round(width),
                height: Math.round(height),
            };

            // Сохраняем нарисованный прямоугольник
            setLastDrawnRect({
                x: Math.round(x),
                y: Math.round(y),
                width: Math.round(width),
                height: Math.round(height),
            });

            onCopyPosition?.(position);
        }

        setDrawingState({
            isDrawing: false,
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
        });
    }, [drawingState, onCopyPosition]);

    /**
     * Вычисляет стили для рисуемого прямоугольника
     */
    const getDrawingRectStyle = useCallback(() => {
        if (!drawingState.isDrawing) return {};

        const x = Math.min(drawingState.startX, drawingState.currentX);
        const y = Math.min(drawingState.startY, drawingState.currentY);
        const width = Math.abs(drawingState.currentX - drawingState.startX);
        const height = Math.abs(drawingState.currentY - drawingState.startY);

        return {
            position: "absolute" as const,
            left: `${x}px`,
            top: `${y}px`,
            width: `${width}px`,
            height: `${height}px`,
            border: "2px dashed #2196f3",
            backgroundColor: "rgba(33, 150, 243, 0.1)",
            pointerEvents: "none" as const,
        };
    }, [drawingState]);

    /**
     * Вычисляет стили для сохраненного прямоугольника
     */
    const getLastDrawnRectStyle = useCallback(() => {
        if (!lastDrawnRect) return {};

        return {
            position: "absolute" as const,
            left: `${lastDrawnRect.x}px`,
            top: `${lastDrawnRect.y}px`,
            width: `${lastDrawnRect.width}px`,
            height: `${lastDrawnRect.height}px`,
            border: "2px solid #2196f3",
            backgroundColor: "rgba(33, 150, 243, 0.2)",
            pointerEvents: "none" as const,
        };
    }, [lastDrawnRect]);

    return (
        <Box
            ref={containerRef}
            position="relative"
            display="inline-block"
            sx={{
                cursor: onCopyPosition ? "crosshair" : "default",
                userSelect: "none",
            }}
            onMouseDown={onCopyPosition ? onMouseDown : undefined}
            onMouseMove={onCopyPosition ? onMouseMove : undefined}
            onMouseUp={onCopyPosition ? onMouseUp : undefined}
        >
            <img
                ref={imageRef}
                src={url}
                alt={langPage.result}
                style={{ display: "block" }}
                draggable={false}
            />
            {/* Отображение сохраненного прямоугольника */}
            {lastDrawnRect && !drawingState.isDrawing && <Box sx={getLastDrawnRectStyle()} />}

            {/* Отображение рисуемого прямоугольника */}
            {drawingState.isDrawing && <Box sx={getDrawingRectStyle()} />}
        </Box>
    );
}
