const ruPages = {
    citizenships: {
        title: "Гражданство",
        fields: {
            id: "ID",
            title: "Название",
        },
    },
    messages: {
        title: "Оповещения",
        detailsTitle: "Оповещения от %s",
        fields: {
            message: "Сообщение",
            date: "Дата",
        },
    },
    nationalities: {
        title: "Национальность",
        fields: {
            id: "ID",
            title: "Название",
        },
    },
    claims: {
        title: "Заявки",
        message: 'Ваша заявка "%s" изменила статус на "%s"',
        fields: {
            id: "Номер",
            title: "Название",
            status: "Статус",
            description: "Описание",
            resolution: "Результат",
            uid: "Заявитель",
            created_at: "Дата подачи",
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
            claim: "Заявка",
            add: "Новая заявка",
            noRecordsText: "У вас нет заявок",
            fields: {
                id: "Номер",
                title: "Название",
                updatedDate: "Дата",
                status: "Статус",
                actions: "Действия",
            },
            success: {
                removeClaim: "Заявка удалена",
                addClaim: "Заявка подана",
            },
            errors: {
                removeClaim: "Не удалось удалить заявку!",
                addClaim: "Не удалось подать заявку!",
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
        actions: {
            qr: "QR сканер",
            showId: "Показать ID",
            profile: "Мой профиль",
            messages: "Оповещения",
            claims: "Мои заявки",
        },
        myId: {
            title: "Мой ID",
        },
    },
    passport: {
        byGuid: {
            title: "Информация о жителе",
            errors: {
                getUserByGuid: "Пользователь не найден",
            },
        },
        user: {
            passportData: "Паспорт",
            mainData: "Основное",
        },
        claims: { title: "Заявки" },
    },

    qrScanner: {
        title: "QR сканер",
        startScan: "Начать сканирование QR",
        errors: {
            notDetect: "Данный код сюда не подходит",
        },
    },
    users: {
        title: "Пользователи",
        fields: {
            id: "ID",
            fullName: "Имя",
            nationalityId: "Национальность",
            citizenshipId: "Гражданство",
            image: "Фото",
            created_at: "Создан",
            actions: "Действие",
        },
        actions: {
            edit: "Редактировать",
        },
        success: {
            updateUser: "Пользователь отредактирован",
        },
        errors: {
            getUser: "Пользователь не найден!",
            updateUser: "Не удалось отредактировать пользователя!",
        },
    },
};
export default ruPages;
