import { useMemo, useState } from "react";
import { Avatar, Box, ListItem, ListItemAvatar, ListItemText, Paper, Typography, Collapse } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

import type { TIconName } from "components/Icon";
import Icon from "components/Icon";
import { menuToggle } from "store/reducers/ComponentsSlice";
import IconButton from "components/Icon/IconButton";
import { checkUserRoleAccess } from "components/RoleChecker";
import lang from "lang";

import { useAppDispatch, useAppSelector } from "api/hooks/redux";
import { getServerFileUrl } from "api/common/helper";
import type { TRoleCheckerRole } from "api/interfaces/user/IRoleDto";
import { useStorage } from "api/hooks/useStorage";

import InputSearch from "components/Inputs/InputSearch";
import { textFilter } from "api/common/filters";

import menuList from "./menuList";

export interface INavigationMenu {
    name: string;
    title: string;
    icon: TIconName;
    link: string;
    roles?: TRoleCheckerRole[];
    category?: "main" | "administrative" | "medical" | "police" | "money" | "admin" | "polices";
}

/**
 * Интерфейс для группированного меню по категориям
 */
interface IGroupedMenuCategory {
    category: string;
    categoryTitle: string;
    items: INavigationMenu[];
}

export default function NavigationMenuDrawer() {
    const isAuth = useAppSelector((s) => s.user.isAuth);
    const user = useAppSelector((s) => s.user.user);
    const roles = useAppSelector((s) => s.user.roles);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [filterText, setFilterText] = useState("");
    const [collapsedCategories, setCollapsedCategories] = useStorage<string[]>("navigation-menu-collapsed", []);
    const deviceScreenName = useAppSelector((state) => state.device.screen.name);

    const langPage = lang.components.navigationMenu;

    const filteredMenuList = useMemo<INavigationMenu[]>(() => {
        return menuList.filter((x) => {
            // Фильтрация по ролям
            if (x.roles?.length) {
                if (isAuth && !!user?.role.params) {
                    if (!checkUserRoleAccess(x.roles, user.role.params)) {
                        return false;
                    }
                }
            }

            // Фильтрация по тексту
            if (filterText.trim()) {
                const searchText = filterText.toLowerCase().trim();
                return textFilter(searchText, x.title);
            }

            return true;
        });
    }, [isAuth, user?.role.params, filterText]);

    /**
     * Группировка меню по категориям
     */
    const groupedMenuList = useMemo<IGroupedMenuCategory[]>(() => {
        const groups: { [key: string]: INavigationMenu[] } = {};

        // Группируем пункты по категориям
        filteredMenuList.forEach((menu) => {
            const category = menu.category || "main";
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(menu);
        });

        // Предпочтительный порядок категорий
        const preferredOrder = ["main", "administrative", "medical", "police", "money", "admin", "polices"];

        // Формируем порядок категорий на основе реально имеющихся данных (только непустые категории)
        const availableCategories = Object.keys(groups).filter((category) => groups[category].length > 0);
        const categoryOrder = [
            // Сначала добавляем категории в предпочтительном порядке, если они есть в данных
            ...preferredOrder.filter((category) => availableCategories.includes(category)),
            // Затем добавляем остальные категории, которые не в предпочтительном порядке
            ...availableCategories.filter((category) => !preferredOrder.includes(category)),
        ];

        // Преобразуем в массив с заголовками категорий (только непустые категории)
        const result: IGroupedMenuCategory[] = categoryOrder.map((category) => ({
            category,
            categoryTitle: langPage.categories[category as keyof typeof langPage.categories] || category,
            items: groups[category],
        }));

        return result;
    }, [filteredMenuList]);

    const toProfile = () => {
        navigate("/profile");
        closeMenu();
    };

    const closeMenu = () => {
        dispatch(menuToggle());
    };

    /**
     * Переключение состояния сворачивания категории
     */
    const toggleCategoryCollapse = (category: string) => {
        setCollapsedCategories((prev) => {
            if (prev.includes(category)) {
                return prev.filter((c) => c !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    /**
     * Проверка, свернута ли категория
     */
    const isCategoryCollapsed = (category: string) => {
        if (filterText) {
            return false;
        }
        return collapsedCategories.includes(category);
    };

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            {/* Закрепленный заголовок с профилем */}
            <Paper
                sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    height: "60px",
                    display: "flex",
                    flexShrink: 0,
                    "& span,p": { color: "primary.contrastText" },
                }}
            >
                <ListItem
                    component="div"
                    secondaryAction={
                        <>
                            <IconButton
                                name="settings"
                                onClick={toProfile}
                            />
                            {deviceScreenName !== "big" && (
                                <IconButton
                                    name="right"
                                    onClick={closeMenu}
                                />
                            )}
                        </>
                    }
                >
                    <ListItemAvatar>
                        {user?.image ? (
                            <Avatar src={getServerFileUrl(user?.image)} />
                        ) : (
                            <Avatar>{user?.firstName[0]}</Avatar>
                        )}
                    </ListItemAvatar>
                    <ListItemText
                        primary={user?.firstName}
                        secondary={roles.find((x) => x.id === user?.roleId)?.title}
                    />
                </ListItem>
            </Paper>

            {/* Закрепленное поле фильтрации */}
            <Box sx={{ p: 1, borderBottom: "1px solid", borderColor: "grey.200", flexShrink: 0 }}>
                <InputSearch
                    fullWidth
                    placeholder="Поиск по меню..."
                    value={filterText}
                    onChangeValue={setFilterText}
                    variant="standard"
                    autoComplete="off"
                />
            </Box>

            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                }}
            >
                <Box
                    sx={{
                        "& a": {
                            color: "common.black",
                            opacity: 0.7,
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            py: 0.75,
                            px: 2,
                            borderRadius: "0 8px 8px 0",
                            margin: "2px 8px 2px 0",
                            transition: "all 0.2s ease-in-out",
                            "& .MuiSvgIcon-root": {
                                transition: "all 0.2s ease-in-out",
                            },
                            "&:hover": {
                                opacity: 1,
                                backgroundColor: "grey.100",
                                transform: "translateX(4px)",
                            },
                            "&.active": {
                                backgroundColor: "primary.main",
                                color: "primary.contrastText",
                                opacity: 1,
                                fontWeight: 600,
                                borderLeft: "4px solid",
                                borderLeftColor: "primary.dark",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                "& .MuiSvgIcon-root": {
                                    color: "primary.contrastText",
                                    transform: "scale(1.1)",
                                },
                            },
                        },
                    }}
                >
                    {groupedMenuList.length === 0 && filterText.trim() ? (
                        <Box sx={{ p: 2, textAlign: "center" }}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {langPage.notFound}
                            </Typography>
                        </Box>
                    ) : (
                        groupedMenuList.map((categoryGroup, groupIndex) => (
                            <Box key={categoryGroup.category}>
                                {/* Заголовок категории с кнопкой сворачивания */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        px: 2,
                                        py: 1,
                                        color: "primary.main",
                                        borderLeft: "3px solid",
                                        borderLeftColor: "primary.main",
                                        backgroundColor: "grey.50",
                                        cursor: "pointer",
                                        ...(groupIndex > 0 && {
                                            borderTop: "1px solid",
                                            borderTopColor: "grey.200",
                                        }),
                                        "&:hover": {
                                            backgroundColor: "grey.100",
                                        },
                                    }}
                                    onClick={() => toggleCategoryCollapse(categoryGroup.category)}
                                    title={
                                        isCategoryCollapsed(categoryGroup.category)
                                            ? langPage.actions.expand
                                            : langPage.actions.collapse
                                    }
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            flex: 1,
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            fontSize: "0.7rem",
                                            letterSpacing: "0.08em",
                                            opacity: 0.8,
                                        }}
                                    >
                                        {categoryGroup.categoryTitle}
                                    </Typography>
                                    <IconButton
                                        name={isCategoryCollapsed(categoryGroup.category) ? "down" : "up"}
                                        size="small"
                                        sx={{
                                            color: "primary.main",
                                            opacity: 0.7,
                                            "&:hover": {
                                                opacity: 1,
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Пункты меню категории с анимацией */}
                                <Collapse
                                    in={!isCategoryCollapsed(categoryGroup.category)}
                                    timeout="auto"
                                >
                                    {categoryGroup.items.map((menu: INavigationMenu) => (
                                        <NavLink
                                            key={menu.name}
                                            to={menu.link}
                                            onClick={closeMenu}
                                        >
                                            <Icon
                                                name={menu.icon}
                                                sx={{ mr: 1 }}
                                            />
                                            {menu.title}
                                        </NavLink>
                                    ))}
                                </Collapse>
                            </Box>
                        ))
                    )}
                </Box>
            </Box>
        </Box>
    );
}
