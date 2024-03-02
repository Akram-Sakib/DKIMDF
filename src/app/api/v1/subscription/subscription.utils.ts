// calculate the end time based on the membership type

import { Membership, Subscription } from "@prisma/client";

export const calculateEndTime = (membership: Membership, subscriptionPayload: Subscription) => {

    // calculate the end time based on the membership type
    if (membership?.type === "weekly") {
        subscriptionPayload.endTime = new Date(
            new Date(subscriptionPayload.startTime).setDate(new Date(subscriptionPayload.startTime).getDate() + 7)
        );
    } else if (membership?.type === "monthly") {
        subscriptionPayload.endTime = new Date(
            new Date(subscriptionPayload.startTime).setMonth(new Date(subscriptionPayload.startTime).getMonth() + 1)
        );
    } else if (
        membership?.type === "halfYearly"
    ) {
        subscriptionPayload.endTime = new Date(
            new Date(subscriptionPayload.startTime).setMonth(new Date(subscriptionPayload.startTime).getMonth() + 6)
        );
    } else if (membership?.type === "yearly") {
        subscriptionPayload.endTime = new Date(
            new Date(subscriptionPayload.startTime).setFullYear(new Date(subscriptionPayload.startTime).getFullYear() + 1)
        );
    } else if (membership?.type === "lifeTime") {
        subscriptionPayload.endTime = new Date(
            new Date(subscriptionPayload.startTime).setFullYear(new Date(subscriptionPayload.startTime).getFullYear() + 100)
        );
    }
}