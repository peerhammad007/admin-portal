import { PolicyFormData } from "../../../../pages/AddPolicyWizard";

interface ReviewStepProps {
  data: PolicyFormData;
}
const ReviewStep = ({data}: ReviewStepProps) => (
    <>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
)

export default ReviewStep;