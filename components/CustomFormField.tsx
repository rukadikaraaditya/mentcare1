'use client'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import Image from "next/image"
import { FormFieldType } from "./forms/PatientForm"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {E164Number} from "libphonenumber-js"




interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field:any) => React.ReactNode,
}

const RenderField=({field,props}:{field:any,props:CustomProps})=>{
    const { fieldType, iconSrc, iconAlt, placeholder, renderSkeleton } = props
    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            height={24}
                            width={24}
                            alt={iconAlt || "icon"}
                            className='ml-2'
                        />
                    )}

                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return(
                <FormControl>
                    <PhoneInput
                       defaultCountry="IN"
                       placeholder={placeholder}
                       international
                       withCountryCallingCode
                       value={field.value as E164Number | undefined}
                       onChange={field.onChange}
                       className="input-phone"


                    />
                </FormControl>
            )
        default:
            break;
    }
}

const CustomFormField = (props:CustomProps) => {
    const { control, fieldType, name, label, renderSkeleton } = props
  return (
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem className="flex-1">
                {fieldType !== FormFieldType.CHECKBOX && label && (
                    <FormLabel>
                        {label}
                    </FormLabel>
                )}
                <RenderField field={field} props={props}/>
                <FormMessage className="shad-error"/>
            </FormItem>
    )}
  />)

}

export default CustomFormField
