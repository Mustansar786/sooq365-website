const Cancellation = [
    {
        title: "Guest no-shows",
        body: "If a guest wants to cancel a booked trip, they must notify the host via Urent’s In-App chat as soon as possible. The cancellation must be processed through the Urent app. If you fail to cancel, and don’t show up for the trip at the pickup location after 120 minutes of the trip’s start time, it is considered a guest no-show and guest no-show fees apply. A guest who shows up to a trip with no license or with an invalid license is also considered a guest no-show. After charging the fees, Refunds will be done only through the Original Mode of Payment.",
        bodyTable: [{
            columnOne: "Trip Length",
            columnTwo: "Fee"
        }, {
            columnOne: "More than 3 days*",
            columnTwo: "3 days rate of the trip cost"
        }, {
            columnOne: "Less than 3 days",
            columnTwo: "75% of 1 day of the trip cost"
        }],
        extraText:''
    },
    {
        title: "Guest’s late return",
        body: "If the guest fails to show up at the agreed vehicle’s handover location after 120 minutes of the trip’s end time which is considered the grace period, full daily rental price will be charged for the overdue period. This overdue charge might be collected outside the App by the commercial host.",
        bodyTable: [],
        extraText:''
    },
    {
        title: "Guest cancellation fees",
        body: "If a guest wants to cancel a booked trip, they must notify the host via Urent messaging as soon as possible. and must process the cancellation through the Urent app. If the guest cancels the trip before the host approves the booking, the guest won't incur any charges. This is only applicable to bookings that need the host's approval. If the booking is an instant one or if the guest wants to cancel after the host already approved, below rules apply.",
        bodyTable: [{
            columnOne: "Time of cancellation",
            columnTwo: "Cancellation Fee"
        }, {
            columnOne: "24 hours or more before trip start",
            columnTwo: "10% of the overall booking price"
        }, {
            columnOne: "Less than 24 hours of the start of the trip",
            columnTwo: "20% of the overall booking price"
        }],
        extraText:'A guest can cancel a booking without any charge if he books another one with the same host within 24 hours.Refunds will be done only through the Original Mode of Payment.'
    }, {
        title: "Host no-shows",
        body: "If a host wants to cancel an approved trip, they must notify the guest via Urent messaging as soon as possible. Failure to cancel and/or a 60 minutes delay to meet your guest at the specified location from the start of the trip time without notifying your guest will be considered as a host no show which will be subject to 500 Dhs penalty and a complete removal of the trip earnings. An extra fine of 150 Dhs will be applied in case of repeated incidents and it will be subject to the removal from Urent marketplace. For same day bookings, hosts have a grace period of 120 minutes to meet their guests at the specified location from the start of the trip without applying the above host no show penalty. If the Guest upon meeting the host, determines (acting reasonably) that the Registered Vehicle is materially different from the description of the Registered Vehicle on the Services, this also considered as a host no show and host no show penalty mentioned above will apply. Unless agreed otherwise between the Host, and the renter.",
        bodyTable:[],
        extraText:''
    }, {
        title: "Host Cancellations",
        body: "Subject to cancellation reasons, In case of the host cancelling your trip, Urent team will reach out to the guest to try to accommodate an alternative vehicle via other hosts. If guests choose not to make another booking, guests are entitled to a full refund and hosts are subject to the below penalties",
        bodyTable: [{
            columnOne: "Time of cancellation",
            columnTwo: "Cancellation Fee"
        }, {
            columnOne: "More than 48 hours of the start of the trip",
            columnTwo: "20% of the trip earning,and an extra fine of 150 Dhs in case of a repeated incidents and to subject to the removal of Urent marketplace"
        }, {
            columnOne: "Less than 48 hours of the start of the trip",
            columnTwo: "20% of the trip earnings , and an extra fine of 250 Dhs in case of a repeated incidents and to subject to the removal of Urent marketplace"
        }],
        extraText:''
    }, {
        title: "Host’s Trip modifications",
        body: "After the host approves the booking no further modifications can be made. Cancellations or host no shows are subjects to Urent fines and charges. All fines are charges to be imposed per violation",
        bodyTable:[],
        extraText:''
    }, {
        title: "Refunds",
        body: "Refunds will be made onto the original mode of payment and will be processed within 10 to 45 days depends on the issuing bank of the credit card.",
        bodyTable:[],
        extraText:''
    }
]
export default Cancellation

