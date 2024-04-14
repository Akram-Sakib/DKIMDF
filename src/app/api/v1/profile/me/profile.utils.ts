import prisma from "@/lib/prisma";
import { PermanentAddress, PresentAddress } from "@prisma/client";
type Role = "grand_admin" | "super_admin" | "admin" | "member"

export const updateProfileData = async (userId: string, role: Role, permanentAddress: PermanentAddress, presentAddress: PresentAddress, rest: any) => {
    let userRole: string = ""
    if (role === "grand_admin") {
        userRole = "grandAdmin"
    } else if (role === "super_admin") {
        userRole = "superAdmin"
    } else if (role === "admin") {
        userRole = "admin"
    } else if (role === "member") {
        userRole = "member"
    }

    const presentAddressResult = await prisma.presentAddress.update({
        where: {
            id: rest.presentAddressId,
        },
        data: {
            ...presentAddress,
        }
    });

    const permanentAddressResult = await prisma.permanentAddress.update({
        where: {
            id: rest.permanentAddressId,
        },
        data: {
            ...permanentAddress,
        }
    });
    // @ts-ignore
    return await prisma[`${userRole}`].update({
        where: {
            userId,
        },
        data: {
            ...rest,
            presentAddressId: presentAddressResult.id,
            permanentAddressId: permanentAddressResult.id
        },
        include: {
            presentAddress: true,
            permanentAddress: true
        }
    })
}
