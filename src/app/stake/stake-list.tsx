import { Button } from "@/app/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"

interface StakeItemProps {
    name: string
    startDate: string
    dueDate: string
    profit: string
    interestRate: string
    amount: string
    daysLeft?: string
    showWithdrawals?: boolean
}

function StakeItem({
    name,
    startDate,
    dueDate,
    profit,
    interestRate,
    amount,
    daysLeft,
    showWithdrawals = false,
}: StakeItemProps) {

    const overStaking = {
        "amount": "1,000",
        "term": "2 Months",
        "interest Rate": "10%",
        "Received": 100,
        "Remaining": "20 Days",
    }
    return (
        <div>
            <div className="border-2 flex flex-grow border-blue-400/50 rounded-xl p-4 mb-4 bg-gradient-purple-cyan-0deg backdrop-blur-sm hover:border-blue-400/70 transition-all duration-300">
                <div className="flex items-center w-[40px]"><ChevronDown className="w-4 h-4 text-neutral" /></div>
                <div className="flex flex-1 gap-2 flex-col mr-10">
                    <p className="text-lg kati-font font-medium">Short-Term 2 Months</p>
                    <p className="text-xs text-neutral bg-green-700 max-w-[200px] flex items-center justify-center rounded-full px-2 py-1 mb-0 p-0">2 Withdrawable Stakes</p>
                </div>
                <div className=" flex-1 flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="text-sm text-neutral mb-1">All Amount</p>
                        <p className="text-base kati-font font-medium text-neutral">{overStaking.amount} MMP</p>
                    </div>
                </div>
                <div className=" flex-1 flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="text-sm text-neutral mb-1">Term</p>
                        <p className="text-base kati-font font-medium">{overStaking.term}</p>
                    </div>

                </div>
                <div className=" flex-1 flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="text-sm text-neutral mb-1">All Received</p>
                        <p className="text-base kati-font font-medium text-green-600">+ {overStaking.Received} MMP</p>
                    </div>
                </div>
            </div>
            <div className="bg-black/50 rounded-lg p-5">
                <div className="flex gap-5 items-center mb-2">
                    <span className="text-lg kati-font font-medium mb-1 text-cyan">Stake name 1</span>
                    <span className="text-sm text-neutral mb-1">Start date: 24/02/2025</span>
                    <span className="text-sm text-neutral mb-1">Due date: 24/10/2025</span>
                </div>
                <div className="flex gap-16 ">
                    <div className="  flex justify-between items-center">
                        <div className="flex flex-col min-w-[100px]">
                            <p className="text-sm text-neutral mb-1">Amount</p>
                            <p className="text-base kati-font font-medium">{overStaking.amount}</p>
                        </div>
                    </div>
                    <div className="  flex justify-between items-center">
                        <div className="flex flex-col min-w-[100px]">
                            <p className="text-sm text-neutral mb-1">Term</p>
                            <p className="text-base kati-font font-medium">{overStaking.term}</p>
                        </div>

                    </div>
                    <div className="  flex justify-between items-center">
                        <div className="flex flex-col min-w-[100px]">
                            <p className="text-sm text-neutral mb-1">Received</p>
                            <p className="text-base kati-font font-medium text-green-600">+ {overStaking.Received} MMP</p>
                        </div>
                    </div>
                    <div className=" flex justify-between items-center">
                        <div className="flex flex-col min-w-[100px]">
                            <p className="text-sm text-neutral mb-1">Interest Rate</p>
                            <p className="text-base kati-font font-medium">{overStaking["interest Rate"]}</p>
                        </div>
                    </div>

                    <div className="flex flex-1 justify-end items-center">
                        <Button size="sm" className="bg-gradient-violet-blue border-none hover:bg-cyan-600 text-white px-8 py-[2px] text-sm rounded-full">
                            Withdraw
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function StakeList() {
    const stakes = [
        {
            name: "Name123",
            startDate: "24/02/2025",
            dueDate: "24/05/2025",
            profit: "0.1",
            interestRate: "6%",
            amount: "0.5 MMP",
            daysLeft: "12 Days Left",
        },
        {
            name: "Name123",
            startDate: "24/02/2025",
            dueDate: "24/06/2025",
            profit: "0.1",
            interestRate: "6%",
            amount: "0.5 MMP",
            showWithdrawals: true,
        },
        {
            name: "Name456",
            startDate: "15/03/2025",
            dueDate: "15/09/2025",
            profit: "0.25",
            interestRate: "7%",
            amount: "1.2 MMP",
            showWithdrawals: true,
        },
    ]

    return (
        <div className="space-y-4">
            {stakes.map((stake, index) => (
                <StakeItem key={index} {...stake} />
            ))}
        </div>
    )
}
