const ruPages = {
    documentPrint: {
        title: "Печать документов",
        editTitle: "Редактирование документа",
        addTitle: "Добавление документа",
        document: "Тип документа",
        zipName: "Название архива",
        originalName: "Шаблон документа",
        originalNameHelperText: "Формат: png",
        exampleName: "Пример документа",
        params: "Параметры",
        errors: {
            create: "Не удалось создать архив",
            remove: "Не удалось удалить документ!",
            save: "Не удалось сохранить документ!",
        },
        success: {
            remove: "Документ удален",
            save: "Документ сохранен",
        },
        modal: {
            title: "Архив документов",
            success: "Успех",
            text: "Архив документов успешно создан. Документов в архиве: %s",
            download: "Скачать архив",
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
    maps: {
        title: "2Гусь",
    },
    messages: {
        title: "Оповещения",
        addTitle: "Добавить оповещение",
        myTitle: "Мои оповещения",
        detailsTitle: "Оповещения от %s",
        details: "Оповещение",
        toUser: "Получатель",
        message: "Сообщение",
        date: "Дата",
        add: {
            error: "Не удалось отправить оповещение!",
            success: "%s оповещений отправлено!",
        },
    },
    medicalInfo: {
        title: "Больные",
        addTitle: "Выбрать больных",
        add: "Заразить",
        statusActive: "Активен",
        statusNotActive: "Не активен",
        fields: {
            medicalSickness: "Болезнь",
            created_at: "Дата выдачи",
            endDate: "Дата окончания",
            uid: "Больной",
            comments: "История болезни",
            sendMessage: "Оповестить пользователя",
        },
        addUsersSuccess: "Больных заражено: %s",
        addUsersSuccess0: "Больных нет",
        addUsersError: "Не удалось заразить больных!",
    },
    medicalPolicies: {
        title: "Мед. полис",
        myTitle: "Мои полис",
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
    medicalSickness: {
        title: "Болезни",
        message: {
            title: "Болезни",
            text: 'Болезнь "%s" изменена (%s)',
            public: "публичная",
            private: "приватная",
        },
        userDescription: "Описание для пользователя (если публичная)",
        public: "Публичная",
    },
    medicine: {
        title: "Болезни",
        main: "Основное",
        history: {
            title: "История болезни",
            type: "Тип",
            noHistory: "Еще нет данных по лечению",
            add: "Назначить лечение",
            test: "Анализ",
            procedure: "Лечение",
            created_at: "Дата назначения",
            updated_at: "Дата прохождения",
            created_user: "Кто назначил",
            updated_user: "Кто провел",
        },
        diseases: {
            title: "Болезни",
            type: "Тип болезни",
            main: "Основное",
            param1: "Легкое состояние",
            param2: "Среднее состояние",
            param3: "Тяжелое состояние",
            conditions: "Граничные условия",
            cureConditions: "Условия лечения",
            deathConditions: "Условия смерти",
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
            lastSeen: "Последнее наблюдение",
            add: "Назначить анализ",
            edit: "Изменить значение параметра",
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
            statusActive: "Болен",
            statusNotActive: "Здоров",
            createdAt: "Дата начала",
            updatedAt: "Дата последнего изменения",
            isActive: "Активна",
            success: {
                addTest: "Анализ %s назначен",
            },
            errors: {
                add: "Не удалось добавить пациента!",
                addTest: "Не удалось назначить анализ!",
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
    personalities: {
        title: "Персоналки",
        userDescription: "Сообщение для пользователя",
        isCompleted: "Выполнено",
        isActive: "Выполняется",
        message: {
            title: "Персоналка",
            text: 'В разделе "Мои персоналки" появились новые данные',
        },
    },
    taxes: {
        title: "Долги",
        editTitle: "Редактирование долга",
        addTitle: "Назначить долг",
        myTitle: "Мои долги",
        details: "Долги",
        message: {
            title: "Долги",
            text: 'Долг "%s" на сумму %s в статусе "%s"',
        },
        delete: {
            title: "Удалить долг",
            text: "Вы уверены, что хотите удалить долг на сумму %s у пользователя %s?",
            okText: "Да, удалить",
            success: "Долг удален",
        },
        fields: {
            id: "ID",
            title: "Название долга",
            status: "Статус",
            value: "Сумма ( dn )",
            created_at: "Дата назначения",
            endDate: "Дата просрочки долга",
            uids: "Пользователи",
            uid: "Пользователь",
            taxesTypeId: "Категория долга",
            description: "Комментарии",
            taxesTypeDetails: "Комментарии о способе оплаты",
            sendMessage: "Оповестить пользователя",
        },
        errors: {
            taxesTypeNotAllowed: "У вас нет доступа к редактированию долгов данной категории!",
            delete: "Не удалось удалить долг!",
            save: "Не удалось отредактировать долг!",
        },
    },
    taxesTypes: {
        title: "Типы долгов",
    },
    claims: {
        title: "Заявки в администрацию",
        myTitle: "Мои заявки в администрацию",
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
    licenses: {
        title: "Лицензии",
        myTitle: "Мои лицензии",
        created_at: "Дата выдачи",
        endDate: "Дата окончания",
        creator: "Кто выдал",
        errors: {
            add: "Не удалось добавить лицензию!",
            remove: "Не удалось удалить лицензию!",
            save: "Не удалось сохранить лицензию!",
        },
        success: {
            add: "Лицензия добавлена",
            remove: "Лицензия удалена",
            save: "Лицензия сохранена",
        },
        message: {
            title: "Лицензии",
            text: 'Выдана Лицензия "%s" до "%s"',
        },
    },
    login: {
        text: "У вас нет доступа к сайту. Попросите гуся вас пустить",
        toBot: "К гусю",
        extra: {
            title: "супер авторизация",
            webOnly: "Доступно только для веб-версии",
            code: "Введите код",
        },
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
            moneyCount: "Сумма перевода ( dn )",
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
    secrets: {
        title: "Персоналки",
        myTitle: "Мои персоналки",
        description: "Данная информация является игротехнической и предназначена только для вашего личного прочтения!",
        description2:
            "Уважаемые игроки, пожалуйста, не делитесь подробностями персоналок с другими игроками ДО ИГРЫ или по ситуации. Помните, что утечка информации может только усложнить вашу жизнь или вообще привести к самым печальным последствиям.",
        confirm: "Мне это понятно, показывай",
        noData: "Нет данных по вашим персоналкам",
        medicalInfo: {
            title: "Болезнь",
            label: "Болезни",
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
            passport: "Номер паспорта",
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
    companies: {
        title: "Компании и счета",
        myTitle: "Моя компания",
        userId: "Владелец",
        deputyUserId: "Заместитель",
        address: "Адрес регистрации",
        money: "Баланс",
        creatorId: "Исполнитель",
        transactionDate: "Дата транзакции",
        history: "История транзакций",
        addMoney: "Перевод денег",
        company: "Компания",
        message: {
            title: "Компания",
            addText: 'Создана компания "%s"',
            editText: 'Компания "%s" - внесены изменения',
            deleteText: 'Компания "%s" удалена',
            addUserText: 'Компания "%s", баланс изменен: %s',
        },
        delete: {
            title: "Удалить компанию",
            text: 'Вы уверены, что хотите удалить компанию "%s"?',
            okText: "Да, удалить",
        },
        success: {
            addMoney: "Компания %s: текущий баланс %s",
        },
        errors: {
            subtract: "У данной компании нет указанной суммы на счету",
            addMoney: "Транзакция не удалась!",
            companyNotFound: "Компания не найдена",
        },
    },
    home: {
        title: "Главное",
        main: "Основное",
        qr: "QR сканер",
        showId: "Показать ID",
        myId: "Мой ID",
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
        title: "Уголовный розыск",
        statusActive: "Активен",
        statusNotActive: "Не активен",
        message: {
            title: "Уголовный розыск",
            text: 'Статус вашего уголовного розыска "%s"',
            helperText: "Не отправляйте сообщение, если хотите чтобы пользователь не узнал о вашем розыске",
        },
        fields: {
            type: "Уровень",
            created_at: "Дата создания",
            uid: "Разыскиваемый",
            description: "Описание",
            creatorId: "Кто подал",
            travelBan: "Подписка о невыезде",
        },
    },
    wanteds2: {
        title: "Судебный розыск",
        myTitle: "Мои суд",
        statusActive: "Активен",
        statusNotActive: "Не активен",
        ok: "Обязуюсь исполнить",
        message: {
            title: "Судебный розыск",
            text: 'Статус вашего судебного розыска "%s". %s',
        },
        fields: {
            uid: "Разыскиваемый",
            description: "Описание (для судьи)",
            userDescription: "Сообщение для пользователя",
            creatorId: "Кто подал",
        },
    },
    wanteds3: {
        title: "СБГ розыск",
        statusActive: "Активен",
        statusNotActive: "Не активен",
        message: {
            title: "СБГ розыск",
            text: 'Статус вашего СБГ розыска "%s"',
            helperText: "Не отправляйте сообщение, если хотите чтобы пользователь не узнал о вашем розыске",
        },
        fields: {
            uid: "Разыскиваемый",
            description: "Заметки",
            creatorId: "Кто подал",
        },
    },
    weapons: {
        title: "Обучение оружию",
        add: "Улучшить навык",
        weapon: "Навык",
        creator: "Обучил",
        reason: "Действие",
        isMax: "У пользователя максимальный уровень навыка",
        addTitle: "Доступно %s очков на улучшение оружия",
        confirm: {
            selectVariant: "Выберите значение навыка больше текущего",
            needWeapons: "У вас недостаточно очков на улучшение оружия, вам нужно %s очков, у вас %s очков",
            textConfirm: "Улучшение навыка до уровня %s потребует %s очко. Вы уверены?",
        },
        message: {
            title: "Обучение оружию",
            text: 'Навык владения оружием изменен на "%s"',
        },
        success: {
            updateWeapon: "Навык успешно улучшен",
        },
        errors: {
            updateWeapon: "Не удалось улучшить навык",
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
        title: "Пользователи (админка)",
        persons: "База пользователей",
        messageSenderTitle: "Отправить пользователю %s",
        withImage: "Показать фото",
        addUser: "Новый пользователь",
        fields: {
            id: "ID",
            firstName: "Имя Фамилия",
            nationalityId: "Национальность",
            image: "Фото",
            nickname: "Позывной",
            actions: "Действие",
            roleId: "Роль",
            tgLogin: "Telegram",
        },
        actions: {
            edit: "Редактировать",
            message: "Оповещение",

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
