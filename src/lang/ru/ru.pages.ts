const ruPages = {
    claims: {
        title: "Заявки",
        edit: {
            title: "Редактировать заявку",
            addTitle: "Новая заявка",
            fields: {
                title: "Название",
                status: "Статус",
                description: "Описание",
                resolution: "Результат",
                uid: "Заявитель",
            },
        },
    },
    login: {
        text: "У вас нет доступа к сайту. Попросите бота вас пустить",
        toBot: "К боту",
    },
    profile: {
        title: "Мой профиль",
        userForm: "Общая информация",
        claims: {
            title: "Мои заявки",
            add: "Новая заявка",
            noRecordsText: "У вас нет заявок",
            fields: {
                title: "Название",
                updatedDate: "Дата",
                status: "Статус",
                actions: "Действия",
            },
            success: {
                removeClaim: "Заявка удалена",
            },
            errors: {
                removeClaim: "Не удалось удалить заявку!",
            },
            deleteConfirm: {
                title: "Удалить заявку",
                text: 'Вы уверены, что хотите удалить заявку "%s"?',
                okText: "Да, удалить",
            },
        },
        success: {
            updateUser: "Данные обновлены",
        },
        errors: {
            updateUser: "Не удалось обновить данные!",
        },
    },
    registration: {
        text: "Вы не зарегистрированы в системе. Введите:",
        fields: {
            lastName: "Фамилия",
            firstName: "Имя",
            passport: "Номер паспорта",
        },
        success: {
            registration: "Вы успешно зарегистрированы",
        },
        errors: {
            registration: "Не удалось пройти регистрацию!",
        },
    },
    home: {
        title: "Главное",
    },
};
export default ruPages;
