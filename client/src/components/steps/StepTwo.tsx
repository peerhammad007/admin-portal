import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { PolicyFormData } from '../../pages/AddPolicyWizard';
interface StepProps {
    register: UseFormRegister<PolicyFormData>,
    errors: FieldErrors<PolicyFormData>,
}

const StepTwo = ({ register, errors }: StepProps) => (
    <>
        <input {...register('vehicleType')} placeholder='Vehicle Type' />
        <p>{errors.vehicleType?.message}</p>

        <input {...register('vehicleYear')} placeholder='Vehicle Year' />
        <p>{errors.vehicleYear?.message}</p>
    </>
)

export default StepTwo;