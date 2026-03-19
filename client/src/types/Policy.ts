export interface Policy {
    _id: string,
    policyNumber: string,
    customerName: string,
    email: string,
    vehicleType: string,
    vehicleYear: number,
    premiumAmount: number,
    status: 'active' | 'pending' | 'expired',
}