const ruComponents = {
    confirm: {
        title: "Вы уверены?",
        okText: "Да",
        noText: "Отмена",
    },
    crud: {
        loader: "Идет получение данных. Подождите...",
        editTitle: "Редактирование записи",
        addTitle: "Новая запись",
        deleteConfirm: {
            title: "Удаление записей",
            text: "Вы уверены что хотите удалить %s записей?",
            okText: "Удалить",
        },
        success: {
            delete: "Удалено %s записей",
            save: "Данные отредактированы",
        },
        errors: {
            list: "Не удалось получить данные с сервера!",
            delete: "Не удалось удалить выбранные записи!",
            edit: "Не удалось получить запись с сервера!",
            save: "Не удалось сохранить данные на сервере!",
            initialValue: "Не указаны данные по умолчанию",
        },
    },
    documentPrintParams: {
        type: "Тип",
        size: "Размер",
        align: "Выравнивание",
        x: "X",
        y: "Y",
        width: "Ширина",
        height: "Высота",
        example: "Образец",
        result: "Результат",
        color: "Цвет",
        pastePosition: "Вставить позицию",
        copiedPosition: "Скопированная позиция",
    },
    header: {
        appLast: "Вы используете последнюю версию приложения!",
        appNotLast: "Вы используете не последнюю версию приложения! Обновить страницу.",
    },
    htmlEditor: {
        uploadFile: "Загрузить файл",
        video: {
            title: "Вставить ссылку на видео",
            link: "Ссылка на видео",
            cancel: "Отмена",
            ok: "Вставить",
            aspectRatio: "Соотношение сторон",
            aspectRatioVertical: "▯ Вертикальное",
            aspectRatioHorizontally: "▭ Горизонтальное",
            type: "Тип видео",
            typeYoutube: "YouTube",
            typeRutube: "Rutube",
            errors: {
                noVideoLink: "Укажите ссылку на видео",
                isNotLink: "Укажите корректную ссылку",
            },
        },
        iframe: {
            title: "Вставить iFrame",
            link: "Ссылка на iFrame",
            cancel: "Отмена",
            ok: "Вставить",
            aspectRatio: "Соотношение сторон",
            aspectRatioVertical: "▯ Вертикальное",
            aspectRatioHorizontally: "▭ Горизонтальное",
            errors: {
                isNotLink: "Укажите корректную ссылку",
                noVideoLink: "Укажите ссылку на iFrame",
            },
        },
        paste: {
            title: "Вставка текста",
            text: "Вы хотите вставить текст из Буфера обмена. Очистить формат?",
            cancel: "Нет, оставить как есть",
            ok: "Да, очистить",
        },
        errors: {
            fileExtFormat: "Данный тип файлов не поддерживается",
            fileUpload: "Ошибка при загрузке файла на сервер",
        },
        loading: "Подождите, редактор грузится",
    },
    loader: {
        defaultText: "Идет загрузка. Подождите...",
    },
    form: {
        isRequired: "Поле обязательно к заполнению",
        minLength: "Поле должно иметь не менее %s символов",
        maxLength: "Поле должно иметь не более %s символов",
        min: "Значение должно быть не меньше %s",
        max: "Значение должно быть не больше %s",
        cancelBtn: "Отмена",
        submitBtn: "Сохранить",
        isNumber: "Значение должно быть числом",
        isDate: "Укажите корректную дату",
        isPhone: "Укажите корректный номер телефона",
        isEmail: "Укажите корректный Email",
        isSelectValue: "Выберите значение из списка",
        pattern: "Поле содержит недопустимые символы",
        invalidColor: "Неверный формат цвета. Используйте формат #RRGGBB",
    },
    goodTable: {
        loading: "Загрузка...",
        rowsPerPage: "Записей на странице",
        noRecords: "Нет записей",
        noCsvExportData: "Нет записей для скачивания",
        filters: {
            value: "Значение",
            searchType: "Фильтр",
            asc: "По возрастанию",
            desc: "По убыванию",
        },
        toolbar: {
            search: "Введите текст для поиска",
            csvExport: "Скачать",
        },
    },
    image: {
        viewer: {
            errors: {
                load: "Не удалось загрузить изображение",
            },
            actions: {
                download: "Скачать",
                rotateRight: "Повернуть изображение  по часовой стрелке",
                rotateLeft: "Повернуть изображение против часовой стрелки",
                reset: "Сброс",
                close: "Закрыть",
            },
        },
        cropper: {
            actions: {
                rotateRight: "Повернуть изображение  по часовой стрелке",
                rotateLeft: "Повернуть изображение против часовой стрелки",
                reset: "Сброс",
                save: "Сохранить",
                close: "Закрыть",
            },
            selector: {
                tooltip: "Обрезать изображение",
                none: "Не обрезать",
                vertical: "Вертикально  (3 : 4)",
                horizontal: "Горизонтально (4 : 3)",
                square: "Квадрат (1 : 1)",
            },
        },
    },
    inputAutocomplete: {
        noOptionsText: "Ничего не найдено",
        insertSearchText: "Введите текст для поиска",
        selectAll: "Все",
    },
    inputImage: {
        addTitle: "Загрузить",
        deleteTitle: "Удалить изображение?",
        deleteText: "Вы уверены, что хотите удалить изображение?",
    },
    inputTimeDuration: {
        days: "Дней",
        hours: "Часов",
        minutes: "Минут",
        seconds: "Секунд",
    },
    inputUser: {
        userSelect: "Введите Имя и фамилию пользователя или Telegram login",
        scan: "Считать QR",
        errors: {
            searchByName: "Пользователь с такими данными не найден",
            scannerFormat: "Данный код сюда не подходит",
        },
    },
    medicineDisease: {
        param: "Показатель",
        paramTimer: "Минут до начала",
        paramTimerHelperText: "Введите количество минут до начала состояния. 0 - сразу",
        maxParamTimer: "Максимальное время (минут)",
        conditions: {
            title: "Условие",
        },
        actions: {
            title: "Действие",
            addTitle: "Новое действие",
            editTitle: "Редактирование действия",
            value: "Значение",
            add: "+",
            minus: "-",
            equal: "=",
        },
    },
    navigationMenu: {
        notFound: "Ничего не найдено",
        categories: {
            main: "Основное",
            administrative: "Административное",
            medical: "Медицинские услуги",
            police: "Полицейские услуги",
            money: "Финансы",
            admin: "Админка",
            polices: "Управление персоналом",
        },
    },
    map: {
        title: "2Гусь",
        you: "Вы",
    },
    rolePermissions: {},
    sendUserNotification: {
        title: "Отправить пользователю оповещение?",
        hint: "Текст оповещения",
        errors: {
            send: "Не удалось отправить оповещение пользователю",
        },
    },
    treeViewer: {
        clearValue: "Удалить значение",
    },
    qrScanner: {
        text: "Считать QR-код",
        cameraToggle: "Переключить камеру",
        hint: "Поместите QR-код в центр экрана. Если не считывается, протрите линзу камеры.",
        bagCode: "Данный код сюда не подходит",
        loadingText: "Идет инициализация камеры. Подождите...",
        errors: {
            media: "Ваш Браузер не поддерживает работу с камерой.",
            access: "Нет доступа к камере. Нужно проверить разрешения!",
            notFound: "Не найдено доступных камер!",
            notStart: "Нет доступа к камере!",
            access_denied:
                "Доступ к камере запрещен. Для продолжения работы разрешите доступ к камере в браузере для нашего сайта",
        },
    },
    qrPrint: {},
    uploader: {
        imageUploader: {
            add: "Загрузить изображение",
            rotateLeft: "Повернуть влево",
            rotateRight: "Повернуть вправо",
            toCancel: "Отмена",
            toSave: "Сохранить",
            errors: {
                uploadFile: "Не удалось загрузить файл",
            },
        },
    },
    userForm: {
        image: "Фото",
        firstName: "Имя Фамилия",
        nickname: "Позывной",
        weaponPoints: "Очки на оружие",
        role: "Роль",
        nationality: "Национальность",
        jobPosition: "Должность",
        weapon: "Навык оружие",
        passport: "Паспорт",
        registration: "Прописка",
        description: "Секретно. не для всех",
        showId: "Показать ID",
        showPasport: "Показать Паспорт",
        titleShowId: "ID пользователя",
        tgLogin: "Telegram",
        birthDate: "Дата рождения",
    },
    userSelect: {
        multiplePlaceholder: "Выберите пользователей",
        list: {
            title: "Добавить пользователей",
            roles: "По роли",
            nationalities: "По национальности",
            allList: "По имя фамилия",
            addBtn: "Добавить",
            fields: {
                firstName: "Имя Фамилия",
                role: "Роль",
                nationality: "Национальность",
                imageId: "Фото",
            },
        },
    },
};
export default ruComponents;
