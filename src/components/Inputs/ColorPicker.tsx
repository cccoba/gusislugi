import React, { useState } from "react";
import { Box, TextField, InputAdornment, Button, Popover } from "@mui/material";

import type { IInputProps } from "api/interfaces/components/IInputProps";

interface IProps extends IInputProps<string> {
    /**
     * Показывать ли текстовое поле с hex значением
     */
    showHexInput?: boolean;
    /**
     * Предустановленные цвета для быстрого выбора
     */
    presetColors?: string[];
}

/**
 * Компонент для выбора цвета
 * Поддерживает выбор через color picker и ввод hex значения
 */
export default function ColorPicker({
    value = "#000000",
    label = "",
    onChangeValue,
    fullWidth = true,
    error = false,
    required = false,
    helperText = "",
    disabled = false,
    variant = "standard",
    sx = {},
    readOnly = false,
    showHexInput = true,
    presetColors = [
        "#000000",
        "#FFFFFF",
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#FF00FF",
        "#00FFFF",
        "#FFA500",
        "#800080",
    ],
    ...props
}: IProps) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeValue(event.target.value);
    };

    const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hexValue = event.target.value;
        // Проверяем, что значение является валидным hex цветом
        if (/^#[0-9A-F]{6}$/i.test(hexValue) || hexValue === "") {
            onChangeValue(hexValue);
        }
    };

    const handlePresetColorClick = (color: string) => {
        onChangeValue(color);
        setAnchorEl(null);
    };

    const handleOpenPresets = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePresets = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Box sx={sx}>
            {showHexInput ? (
                <TextField
                    {...props}
                    label={label}
                    value={value}
                    onChange={handleHexChange}
                    fullWidth={fullWidth}
                    error={error}
                    required={required}
                    helperText={helperText}
                    disabled={disabled}
                    variant={variant}
                    placeholder="#000000"
                    InputProps={{
                        readOnly: readOnly,
                        startAdornment: (
                            <InputAdornment position="start">
                                <Box
                                    component="input"
                                    type="color"
                                    value={value}
                                    onChange={handleColorChange}
                                    disabled={disabled || readOnly}
                                    sx={{
                                        width: 40,
                                        height: 30,
                                        border: "1px solid #ccc",
                                        borderRadius: 1,
                                        cursor: disabled || readOnly ? "not-allowed" : "pointer",
                                        "&::-webkit-color-swatch-wrapper": {
                                            padding: 0,
                                        },
                                        "&::-webkit-color-swatch": {
                                            border: "none",
                                            borderRadius: "4px",
                                        },
                                    }}
                                />
                            </InputAdornment>
                        ),
                        endAdornment: presetColors.length > 0 && (
                            <InputAdornment position="end">
                                <Button
                                    size="small"
                                    onClick={handleOpenPresets}
                                    disabled={disabled || readOnly}
                                    sx={{ minWidth: "auto", px: 1 }}
                                >
                                    ⋯
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
            ) : (
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                >
                    {label && (
                        <Box
                            component="label"
                            sx={{
                                fontSize: "0.75rem",
                                color: error ? "error.main" : "text.secondary",
                            }}
                        >
                            {label}
                            {required && " *"}
                        </Box>
                    )}
                    <Box
                        component="input"
                        type="color"
                        value={value}
                        onChange={handleColorChange}
                        disabled={disabled || readOnly}
                        sx={{
                            width: fullWidth ? "100%" : 60,
                            height: 40,
                            border: error ? "2px solid" : "1px solid",
                            borderColor: error ? "error.main" : "#ccc",
                            borderRadius: 1,
                            cursor: disabled || readOnly ? "not-allowed" : "pointer",
                            "&::-webkit-color-swatch-wrapper": {
                                padding: 0,
                            },
                            "&::-webkit-color-swatch": {
                                border: "none",
                                borderRadius: "4px",
                            },
                        }}
                    />
                    {presetColors.length > 0 && (
                        <Button
                            size="small"
                            onClick={handleOpenPresets}
                            disabled={disabled || readOnly}
                            sx={{ minWidth: "auto", px: 1 }}
                        >
                            ⋯
                        </Button>
                    )}
                </Box>
            )}

            {/* Popover с предустановленными цветами */}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePresets}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <Box
                    sx={{
                        p: 2,
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        gap: 1,
                        maxWidth: 200,
                    }}
                >
                    {presetColors.map((color) => (
                        <Box
                            key={color}
                            onClick={() => handlePresetColorClick(color)}
                            sx={{
                                width: 30,
                                height: 30,
                                backgroundColor: color,
                                border: "1px solid #ccc",
                                borderRadius: 1,
                                cursor: "pointer",
                                "&:hover": {
                                    transform: "scale(1.1)",
                                },
                                ...(value === color && {
                                    border: "2px solid #1976d2",
                                }),
                            }}
                        />
                    ))}
                </Box>
            </Popover>

            {/* Текст помощи */}
            {helperText && (
                <Box
                    sx={{
                        fontSize: "0.75rem",
                        color: error ? "error.main" : "text.secondary",
                        mt: 0.5,
                    }}
                >
                    {helperText}
                </Box>
            )}
        </Box>
    );
}
