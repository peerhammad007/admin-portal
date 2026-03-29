import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react';
import axios from 'axios';
import StepOne from '../features/policies/components/wizard/StepOne';
import StepTwo from '../features/policies/components/wizard/StepTwo';
import StepThree from '../features/policies/components/wizard/StepThree';
import ReviewStep from '../features/policies/components/wizard/ReviewStep';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/index'
import { clearDraft, saveDraft } from '../features/policies/store/policySlice';


const PolicySchema = z.object({
    policyNumber: z.string().min(1, 'Policy Number is required'),
    customerName: z.string().min(1, 'Policy Name is required'),
    email: z.string().email('Valid email required'),
    vehicleType: z.string().min(1, 'Vehicle type is required'),
    vehicleYear: z.coerce.number().min(1900),
    premiumAmount: z.coerce.number().positive(),
    status: z.enum(['active', 'pending', 'expired']),
});
export type PolicyFormData = z.infer<typeof PolicySchema>


const AddPolicyWizard = () => {
    const dispatch = useDispatch();
    const draft = useSelector((state: RootState) => state.policy)
    const [page, setPage] = useState(1);
    const form = useForm<PolicyFormData>({
        resolver: zodResolver(PolicySchema),
        mode: "onBlur",
        defaultValues: draft
    });

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        getValues
    } = form;

    const handleNext = async () => {
        let fieldsToValidate: (keyof PolicyFormData)[] = [];

        if (page === 1) {
            fieldsToValidate = ['policyNumber', 'customerName', 'email'];
        }

        if (page === 2) {
            fieldsToValidate = ['vehicleType', 'vehicleYear'];
        }

        if (page === 3) {
            fieldsToValidate = ['premiumAmount', 'status'];
        }

        const isValid = await trigger(fieldsToValidate);

        if (isValid) {
            const values = getValues();
            dispatch(saveDraft(values))
            setPage(Math.min(4, page + 1))
        }

    }

    const onSubmit = async (data: PolicyFormData) => {
        try {
            await axios.post(`http://localhost:5000/policy`, {
                ...data,

            })
            dispatch(clearDraft());
            console.log('Poilcy created');
        } catch (err: any) {
            console.log(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {page === 1 && <StepOne register={register} errors={errors} />}
            {page === 2 && <StepTwo register={register} errors={errors} />}
            {page === 3 && <StepThree register={register} errors={errors} />}
            {page === 4 && <ReviewStep data={getValues()} />}

            <button type='button' onClick={() => setPage(Math.max(1, page - 1))}>Prev</button>
            <button type='button' onClick={handleNext}>Next</button>
            {page === 4 && <button type='submit'>Submit</button>}
        </form>
    )
}

export default AddPolicyWizard;