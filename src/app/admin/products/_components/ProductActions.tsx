"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "../../_actions/products";
import { useRouter } from "next/navigation";

export function ActiveToggleDropdownItem({id, isAvailableForPurchase}: {id:string, isAvailableForPurchase: boolean}){
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    return <DropdownMenuItem
    disabled={isPending}
    onClick={()=>{
        startTransition(async ()=>{
            await toggleProductAvailability(id, !isAvailableForPurchase)
            router.refresh()
        })
    }}>
        {isAvailableForPurchase ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
}

export function DeleteDropdownItem({id, disabled}: {id:string, disabled: boolean}){
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    return <DropdownMenuItem
    className="text-red-600 focus:bg-red-500 focus:text-white transition-all duration-150"
    disabled={disabled || isPending}
    onClick={()=>{
        startTransition(async ()=>{
            await deleteProduct(id)
            router.refresh()
        })

    }}>
        Delete
    </DropdownMenuItem>
}