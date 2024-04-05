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
    loader: {
        defaultText: "Идет загрузка. Подождите...",
    },
    filterForm: {},
    form: {
        isRequired: "Поле обязательно к заполнению",
        minLength: "Поле должно иметь не менее %s символов",
        maxLength: "Поле должно иметь не более %s символов",
        cancelBtn: "Отмена",
        submitBtn: "Сохранить",
        isNumber: "Значение должно быть числом",
        isDate: "Укажите корректную дату",
        isPhone: "Укажите корректный номер телефона",
        isEmail: "Укажите корректный Email",
        isSelectValue: "Выберите значение из списка",
        pattern: "Поле содержит недопустимые символы",
    },
    goodTable: {
        loading: "Загрузка...",
        rowsPerPage: "Записей на странице",
        filters: {
            value: "Значение",
            searchType: "Фильтр",
        },
        toolbar: {
            search: "Введите текст для поиска",
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
    navigationMenu: {
        home: "Главное",
        profile: "Профиль",
        claims: "Заявки",
        money: "Финансы",
        users: "Пользователи",
        citizenships: "Гражданство",
        nationalities: "Национальность",
        qrScanner: "QR сканер",
        roles: "Роли",
    },
    rolePermissions: {},
    sendUserNotification: {
        title: "Отправить пользователю оповещение?",
        hint: "Текст оповещения",
        errors: {
            send: "Не удалось отправить оповещение пользователю",
        },
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
        lastName: "Фамилия",
        firstName: "Имя",
        nickname: "Позывной",
        role: "Роль",
        nationality: "Национальность",
        citizenship: "Гражданство",
        passport: "Паспорт",
        registration: "Прописка",
        description: "Секретно. не для всех",
    },
    userSelect: {
        multiplePlaceholder: "Выберите пользователей",
        list: {
            title: "Добавить пользователей",
            roles: "По роли",
            allList: "По ФИО",
            addBtn: "Добавить",
            fields: {
                fullName: "ФИО",
                role: "Должность",
                phone: "Телефон",
                imageId: "Фото",
            },
        },
    },
};
export default ruComponents;
