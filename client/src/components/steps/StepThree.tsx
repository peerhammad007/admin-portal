import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { PolicyFormData } from '../../pages/AddPolicyWizard';
interface StepProps {
    register: UseFormRegister<PolicyFormData>,
    errors: FieldErrors<PolicyFormData>,
}

const StepThree = ({ register, errors }: StepProps) => (
    <>
        <input {...register('premiumAmount')} placeholder='Premium Amount' />
        <p>{errors.premiumAmount?.message}</p>

        <select {...register('status')}>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
        </select>
        <p>{errors.status?.message}</p>
    </>
)

export default StepThree