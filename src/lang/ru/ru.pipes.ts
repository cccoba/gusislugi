const ruPipes = {
    claimStatus: {
        created: "Создана",
        completed: "Выполнена",
        inProgress: "В работе",
        failed: "Отклонена",
    },
    documentPrintParamAlign: {
        left: "Слева",
        center: "По центру",
        right: "Справа",
    },
    documentPrintParamType: {
        name: "Имя Фамилия",
        firstName: "Имя",
        lastName: "Фамилия",
        birthDate: "Дата рождения",
        nationality: "Национальность",
        jobPosition: "Должность",
        passport: "Паспорт",
        image: "Фото",
        qrGuid: "QR-код ID",
        registration: "Регистрация",
        weapon0: "Навык 0",
        weapon1: "Навык 1",
        weapon2: "Навык 2",
        weapon3: "Навык 3",
    },
    medicineDiseaseType: {
        disease: "Заболевание",
        addiction: "Зависимость",
        mentalDisorder: "Псих. расстройство",
    },
    medicineParamsType: {
        digital: "Число",
        boolean: "Да/нет",
        ball: "Баллы",
    },
    medicalPoliciesType: {
        bronze: "Bronze",
        silver: "Silver",
        gold: "Gold",
        platinum: "Platinum",
    },
    messageStatus: {
        claims: "Заявка в администрацию",
        fines: "резерв",
        messages: "Сообщения",
        medicalPolicies: "Мед. полис",
        secrets: "Персоналки",
        taxes: "Долги административные",
        taxes2: "Долги судебные",
        taxes3: "Долги уголовные",
        wanteds: "Уголовный розыск",
        wanteds2: "Судебный розыск",
        company: "Компания",
        licenses: "Лицензии",
        weapons: "Навык оружия",
        wanteds3: "СБГ розыск",
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
    comparisonOperator: {
        equal: "Равно",
        notEqual: "Не равно",
        more: ">",
        less: "<",
        moreOrEqual: ">=",
        lessOrEqual: "<=",
    },
    licenseType: {
        selfDefense: "Орудие самозащиты",
        hunting: "Оружие для охоты",
        driver: "Водительское удостоверение",
    },
    medicinePatientStatus: {
        waiting: "Ожидание",
        active0: "Вызревает",
        active1: "Легкое состояние",
        active2: "Среднее состояние",
        active3: "Тяжелое состояние",
        finished: "Излечено",
    },
    medicinePatientTestStatus: {
        pending: "Назначено",
        finished: "Пройдено",
    },
    medicineProcedureType: {
        procedure: "Лечение",
        pill: "Таблетка",
    },
    medicineTest: {
        test: "Анализ",
        poll: "Опрос",
        measurement: "Измерение",
    },
    rolePermissions: {
        admins: "Администрирование",
        claims: "Заявки",
        qr: "QR-сканер",
        users: "Видеть пользователей",
        medicalInfo: "Больные",
        medicalPolicies: "Мед. полис",
        medicalSickness: "Болезни",
        medicalInfoAdd: "Заражение",
        taxes: "Долги",
        wanteds: "Розыск",
        wanteds2: "Судебный розыск",
        wanteds3: "СБГ розыск",
        company: "Компании",
        shop: "Магазин",
        shopUse: "Покупать в магазине",
        medicineAdmin: "Болезни",
        licenses: "Лицензии",
        weapons: "Оружие",
        taxesTypesView: "Долги (просмотр)",
        taxesTypesEdit: "Долги (редактирование)",
        messages: "Сообщения",
        messageStatuses: "Статусы сообщений",
    },
    rolePermissionAction: {
        view: "Просмотр",
        add: "Создавать",
        edit: "Редактировать",
        delete: "Удалять",
    },
    companyPermissionAction: {
        view: "Просмотр",
        add: "Создавать",
        edit: "Редактировать",
        delete: "Удалять",
        moneyAdd: "Добавлять деньги",
        moneySubtract: "Снимать деньги",
    },
    companyMoneyType: {
        add: "Пополнение счета",
        subtract: "Списание co счета",
    },
    medicalInfoStatus: {
        active: "Болен",
        hard: "Тяжело болен",
        inactive: "Вылечен",
        vaccinated: "Вакцинирован",
    },
    userRolePermissionAction: {
        barsogoria: "Барсогория",
        other: "Иностранцы",
    },
    taxeStatus: {
        active: "Не оплачен",
        completed: "Оплачен",
        expired: "Просрочен",
    },
    wantedType: {
        minima: "Минима",
        minoris: "Минорис",
        majoris: "Майорис",
        ekstremis: "Экстремис",
    },
    wanteds2Type: {
        minima: "Минима",
        minoris: "Минорис",
        majoris: "Майорис",
        ekstremis: "Экстремис",
    },
    weapon: {
        knife: "0",
        pistol: "1",
        automatic: "2",
        machineGun: "3",
    },
};
export default ruPipes;
