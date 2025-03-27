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
            value: "Сумма ( kr )",
            created_at: "Дата назначения",
            endDate: "Дата просрочки",
            uid: "Пользователь",
        },
    },
    links: {
        title: "ГусиЛинкс",
        download: "Скачать",
        helpTitle: "Работа с порталом",
        help: "Справочная информация по пользованию порталом ГусьУслуги",
        errors: {
            getLink: "Не удалось получить информацию о файле",
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
            text: 'Здравствуйте! Уведомляем, что ваш полис %s в статусе "%s"',
            textChange: 'Здравствуйте! Уведомляем, что ваш полис изменен с %s на %s в статусе "%s"',
            addText: 'Здравствуйте! Уведомляем, что вам создан полис "%s" в статусе "%s"',
            trauma_rescue:
                "Вы также включены в программу Травма рескью. Группа мониторинга: https://t.me/+GVW0c87hyyRkYzBi",
            no_trauma_rescue:
                "Вы также убраны из программы Травма рескью. Просим вас самостоятельно выйти из группы мониторинга во избежание дополнительных санкций.",
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
    medicine: {
        title: "Болезни",
        main: "Основное",
        diseases: {
            title: "Болезни",
            type: "Тип болезни",
            main: "Основное",
            param1: "Легкое состояние",
            param2: "Среднее состояние",
            param3: "Тяжелое состояние",
        },
        params: {
            title: "Показатели",
            param: "Показатель",
            unit: "Ед. измерения",
            tests: "Анализы",
            procedures: "Лечение",
            baseValue: "Базовое значение",
            minValue: "Минимальное значение",
            maxValue: "Максимальное значение",
            icon: "Иконка",
            patients: "Пациенты",
        },
        patients: {
            title: "Пациенты",
            patient: "История болезни",
            user: "Пациент",
            disease: "Болезнь",
            add: "Новый пациент",
            status: "Статус",
            errors: {
                add: "Не удалось добавить пациента!",
            },
        },
        procedures: {
            title: "Лечение",
            type: "Тип лечения",
            place: "Кабинет",
            timer: "Время проведения минут",
            params: "Показатели",
        },
        tests: {
            title: "Анализы",
            type: "Тип анализа",
            place: "Кабинет",
            timer: "Время проведения минут",
            params: "Показатели",
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
            value: "Сумма ( kr )",
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
            message: "Сообщение",
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
            retry: "Повторить",
            fields: {
                fromUid: "Отправитель",
                toUid: "Получатель",
                value: "Сумма",
                created_at: "Дата",
                message: "Сообщение",
            },
            errors: {
                history: "Не удалось получить историю платежей!",
            },
        },
        send: {
            title: "Перевести деньги",
            success: "Успех",
            moneyCount: "Сумма перевода ( kr )",
            user: "Получатель",
            maxMoney: "Максимальная сумма: %s %s",
            send: "Перевести",
            message: "Сообщение пользователю",
            hiddenText: "Скрытый перевод",
            errors: {
                userSendMoney: "Не удалось перевести деньги другому пользователю",
                positiveCount: "Сумма должна быть больше нуля",
            },
            successResult: {
                money: "Перевод на сумму",
                money2: "выполнен",
                money3: "УСПЕШНО",
                user: "Получатель",
                id: "Номер транзакции",
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
        main: "Основное",
        services: "Сервисы",
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
    shop: {
        title: "Магазин",
        fields: {
            id: "ID",
            user: "Пользователь",
            sum: "Сумма заказа",
            details: "Детали заказа",
            created_at: "Дата создания",
            eventDate: "Дата заказа",
            count: "Кол-во товаров",
            countText: "%s товаров, %s шт.",
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
            tgLogin: "Telegram",
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
