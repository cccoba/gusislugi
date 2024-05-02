const ruPages = {
    citizenships: {
        title: "Гражданство",
        fields: {
            id: "ID",
            title: "Название",
        },
    },
    fines: {
        title: "Штрафы Север",
        message: {
            title: "Штрафы Север",
            text: 'Штраф "%s" на сумму %s в статусе "%s"',
        },
        fields: {
            id: "ID",
            title: "Название",
            status: "Статус",
            value: "Сумма",
            created_at: "Дата назначения",
            endDate: "Дата просрочки",
            uid: "Пользователь",
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
    medicalInfo: {
        title: "Мед. информация",
        statusActive: "Активен",
        statusNotActive: "Не активен",
        fields: {
            id: "ID",
            title: "Название",
            status: "Активен",
            created_at: "Дата выдачи",
            endDate: "Дата окончания",
            uid: "Пользователь",
        },
    },
    medicalPolicies: {
        title: "Мед. полис",
        statusActive: "Активен",
        statusNotActive: "Не активен",
        message: {
            title: "Мед. полис",
            text: 'Ваша полис "%s" в статусе "%s"',
        },
        fields: {
            id: "ID",
            type: "Тип",
            status: "Активен",
            trauma_rescue: "Травма рескью",
            number: "Номер",
            created_at: "Дата выдачи",
            endDate: "Дата окончания",
            uid: "Пользователь",
        },
    },

    nationalities: {
        title: "Национальность",
        fields: {
            id: "ID",
            title: "Название",
        },
    },
    taxes: {
        title: "Платежи",
        message: {
            title: "Платежи",
            text: 'Платеж "%s" на сумму %s в статусе "%s"',
        },
        fields: {
            id: "ID",
            title: "Название",
            status: "Статус",
            value: "Сумма",
            created_at: "Дата назначения",
            endDate: "Дата просрочки платежа",
            uid: "Пользователь",
        },
    },
    claims: {
        title: "Заявки в администрацию",
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
    money: {
        title: "Финансы",
        userTitle: "Деньги пользователя",
        userName: "Пользователь",
        fields: {
            fromUid: "Отправитель",
            toUid: "Получатель",
            value: "Сумма",
            created_at: "Дата",
            hidden: "Скрыть",
        },
        success: {
            toUserMoneyAdd: "Начислено %s",
        },
        errors: {
            loadData: "Не удалось получить информацию о пользователе",
            toUserMoneyAdd: "Не удалось начислить денег пользователю",
        },
        sgp: {
            title: "Система Гусиных Платежей",
            history: "История переводов",
            send: "Перевести деньги",
            sgp: "СГП",
            fields: {
                money: "Баланс",
            },
        },
        history: {
            title: "История переводов",
            noRecordsText: "Еще не было переводов",
            fields: {
                fromUid: "Отправитель",
                toUid: "Получатель",
                value: "Сумма",
                created_at: "Дата",
            },
            errors: {
                history: "Не удалось получить историю платежей!",
            },
        },
        send: {
            title: "Перевести деньги",
            success: "Успех",
            moneyCount: "Сумма перевода",
            user: "Получатель",
            maxMoney: "Максимальная сумма: %s %s",
            successResult: "Перевод на сумму %s пользователю %s выполнен УСПЕШНО!",
            send: "Перевести",
            hiddenText: "Скрытый перевод",
            errors: {
                userSendMoney: "Не удалось перевести деньги другому пользователю",
                positiveCount: "Сумма должна быть больше нуля",
            },
        },
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
            firstName: "Имя Фамилия",
            passport: "Серия-номер паспорта",
        },
        success: {
            registration: "Вы успешно зарегистрированы",
        },
        errors: {
            registration: "Не удалось пройти регистрацию!",
        },
    },
    roles: {
        title: "Роли",
        fields: {
            id: "ID",
            title: "Роль",
            description: "Описание",
            params: "Доступ",
        },
        success: {
            save: "Роль изменена",
        },
        errors: {
            save: "Не удалось отредактировать запись",
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
            medicalPolicies: "Мой мед. полис",
            taxes: "Мои платежи",
            fines: "Мои штрафы ( Сев. Прешев )",
            persons: "База пользователей",
        },
        myId: {
            title: "Мой ID",
        },
    },
    passport: {
        byGuid: {
            title: "Информация о жителе",
            haveData: "Есть записи!",
            notHaveData: "нет записей",
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
    wanteds: {
        title: "Розыск Юг",
        title2: "Розыск Север",
        statusActive: "Активен",
        statusNotActive: "Не активен",
        message: {
            title: "Розыск",
            text: 'Статус вашего розыска "%s"',
        },
        fields: {
            id: "ID",
            image: "Фото",
            type: "Уровень",
            status: "Статус розыска",
            created_at: "Дата создания",
            uid: "Разыскиваемый",
            description: "Описание",
            addUserId: "Кто подал",
        },
    },
    users: {
        title: "Пользователи",
        messageSenderTitle: "Отправить пользователю %s",
        withImage: "Показать фото",
        addUser: "Новый пользователь",
        fields: {
            id: "ID",
            firstName: "Имя Фамилия",
            nationalityId: "Национальность",
            citizenshipId: "Гражданство",
            image: "Фото",
            nickname: "Позывной",
            actions: "Действие",
            roleId: "Роль",
        },
        actions: {
            edit: "Редактировать",
            message: "Оповещение",
            money: "Деньги",
            passport: "Паспорт",
        },
        success: {
            updateUser: "Пользователь отредактирован",
            addUser: "Пользователь создан",
        },
        errors: {
            getUser: "Пользователь не найден!",
            updateUser: "Не удалось отредактировать пользователя!",
            addUser: "Не удалось создать пользователя!",
        },
    },
};
export default ruPages;
