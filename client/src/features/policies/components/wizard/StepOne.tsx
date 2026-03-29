import {UseFormRegister, FieldErrors} from 'react-hook-form'
import { PolicyFormData } from '../../../../pages/AddPolicyWizard';
interface StepProps {
    register: UseFormRegister<PolicyFormData>,
    errors:FieldErrors<PolicyFormData>,
}
const StepOne = ({ register, errors }: StepProps) => (
    <>
        <input {...register('policyNumber')} placeholder='Policy Number' />
        <p>{errors.policyNumber?.message}</p>

        <input {...register('customerName')} placeholder='Customer Name' />
        <p>{errors.customerName?.message}</p>

        <input {...register('email')} placeholder='Email' />
        <p>{errors.email?.message}</p>
    </>
)

export default StepOne;