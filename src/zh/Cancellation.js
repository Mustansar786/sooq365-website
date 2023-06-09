const Cancellation = [
    {
        title: "客人缺席",
        body: `如果客人想取消预订的行程,他们必须尽快通过 Urent 的应用内聊天通知房东。取消必须通过 Urent 应用程序处理。如果您未能取消,并且在行程开始时间 120 分钟后未出现在接送地点,则 被视为客人未出现,并需支付客人未出现费用。没有许可证或许可证无效的客人也被视为客人未 出现。收取费用后,退款将仅通过原始付款方式进行。`,
        bodyTable: [{
            columnOne: "行程长度",
            columnTwo: "费用"
        }, {
            columnOne: "超过 3 天*",
            columnTwo: "3天的旅行费用率"
        }, {
            columnOne: "不到3天",
            columnTwo: "1 天行程费用的 75%"
        }],
        extraText:''
    },
    {
        title: "客人迟到",
        body: `如果客人在旅行结束时间(被视为宽限期)的 120 分钟后仍未出现在约定的车辆交接地点,则将收取逾期 的全额每日租金。商业主机可能会在应用程序之外收取此逾期费用。`,
        bodyTable: [],
        extraText:''
    },
    {
        title: "客人取消费用",
        body: `如果客人想取消预订的行程,他们必须尽快通过 Urent 消息通知房东。并且必须通过 Urent 应用程序处理 取消。如果客人在房东批准预订之前取消行程,客人将不会产生任何费用。这仅适用于需要房东批准的预 订。如果预订是即时预订,或者如果房客想在房东批准后取消预订,则适用以下规则。

        `,
        bodyTable: [{
            columnOne: "取消时间",
            columnTwo: "取消费用"
        }, {
            columnOne: "行程开始前 24 小时或更长时间",
            columnTwo: "总预订价格的 10%"
        }, {
            columnOne: "行程开始前不到 24 小时",
            columnTwo: "总预订价格的 20%"
        }],
        extraText:`如果客人在 24 小时内向同一房东预订了另一份预订,则可以免费取消预订。

        退款将仅通过原始付款方式进行。`,
    }, {
        title: "客人行程修改",
        body: "对于客人要求修改行程的任何行程,取消政策和修改前的任何相关费用将适用。",
        bodyTable:[],
        extraText:''
    }, {
        title: "主机取消",
        body: `视取消原因而定,如果房东取消您的行程,Urent 团队将与客人联系,尝试通过其他房东安排替代车辆。 如果房客选择不再预订,房客有权获得全额退款,房东将受到以下处罚`,
        bodyTable: [{
            columnOne: "取消时间",
            columnTwo: "取消费用"
        }, {
            columnOne: "行程开始时间超过 48 小时",
            columnTwo: "行程收入的 20%,如发生重复事件,将被处以 150 Dhs 的 额外罚款,并以取消 Urent 市场为条件"
        }, {
            columnOne: "旅行开始前不到 48 小时",
            columnTwo: "旅行收入的 20%,如果重复发生并被取消 Urent 市场,则 额外罚款 250 Dhs"
        }],
        extraText:''
    }, {
        title: "主持的行程修改",
        body: `主持批准预订后,将无法进行进一步修改。取消或主机不显示会受到 Urent 罚款和费用的约束。

        所有罚款都是按违规行为收取的费用`,
        bodyTable:[],
        extraText:''
    }, {
        title: "退款",
        body: `退款将按照原始付款方式进行,并会在 10 至 45 天内处理,具体取决于信用卡的发卡行。`,
        bodyTable:[],
        extraText:''
    }
]
export default Cancellation

