const ruPipes = {
    claimStatus: {
        created: "Создана",
        completed: "Выполнена",
        inProgress: "В работе",
        failed: "Отклонена",
    },
    messageStatus: {
        new: "Новая",
        readed: "Прочитано",
    },
    filterTextEquals: {
        contains: "Содержит",
        notContains: "Не содержит",
        equals: "Равен",
        startWith: "Начинается с",
        endWith: "Заканчивается на",
        isClear: "Нет значения",
        isNotClear: "Есть значение",
    },
    filterNumberEquals: {
        contains: "Содержит",
        notContains: "Не содержит",
        equals: "Равно",
        more: ">=",
        less: "<=",
        notEquals: "Не равно",
    },
    filterDateEquals: {
        equals: "Равно",
        more: ">=",
        less: "<=",
        notEquals: "Не равно",
    },
    medicalPoliciesType: {
        oms: "ОМС",
        base: "Базовый",
        advanced: "Продвинутый",
        platinum: "Платиновый",
        corporate: "Корпоративный",
    },
    rolePermissions: {
        admins: "Администрирование",
        claims: "Заявки",
        qr: "QR-сканер",
        users: "Пользователи",
        medicalPolicies: "Мед. полис",
    },
    rolePermissionAction: {
        view: "Просмотр",
        add: "Создавать",
        edit: "Редактировать",
        delete: "Удалять",
    },
};
export default ruPipes;
