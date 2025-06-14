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

interface StakeGroupProps {
    stakeName: string
    allAmount: string
    term: string
    interestRate: string
    stakes: StakeItemProps[]
}

function StakeGroup({
    stakeName,
    allAmount,
    term,
    interestRate,
    stakes,
}: StakeGroupProps) {
    const withdrawableCount = stakes.filter(stake => stake.showWithdrawals).length
    
    return (
        <div>
            <div className="border-2 flex flex-grow border-blue-400/50 rounded-xl p-4 mb-4 bg-gradient-purple-cyan-0deg backdrop-blur-sm hover:border-blue-400/70 transition-all duration-300">
                <div className="flex items-center w-[40px]"><ChevronDown className="w-4 h-4 text-neutral" /></div>
                <div className="flex flex-1 gap-2 flex-col mr-10">
                    <p className="text-lg kati-font font-medium">Stake - Term {stakeName}</p>
                    {withdrawableCount > 0 && (
                        <p className="text-xs text-neutral bg-green-700 max-w-[200px] flex items-center justify-center rounded-full px-2 py-1 mb-0 p-0">
                            {withdrawableCount} Withdrawable Stakes
                        </p>
                    )}
                </div>
                <div className=" flex-1 flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="text-sm text-neutral mb-1">All Amount</p>
                        <p className="text-base kati-font font-medium text-neutral">{allAmount}</p>
                    </div>
                </div>
                <div className=" flex-1 flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="text-sm text-neutral mb-1">Term</p>
                        <p className="text-base kati-font font-medium">{term}</p>
                    </div>
                </div>
                <div className=" flex-1 flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="text-sm text-neutral mb-1">Interest Rate</p>
                        <p className="text-base kati-font font-medium text-green-600">{interestRate}</p>
                    </div>
                </div>
            </div>
            {stakes.length > 0 && (
                <div className="">
                    {stakes.map((stake, index) => (
                        <div key={index} className="mb-4 last:mb-0 bg-black/50 rounded-lg p-5">
                            <div className="flex gap-5 items-center mb-2">
                                <span className="text-sm text-neutral mb-1">Start date: {stake.startDate}</span>
                                <span className="text-sm text-neutral mb-1">Due date: {stake.dueDate}</span>
                            </div>
                            <div className="flex gap-16 ">
                                <div className="  flex justify-between items-center">
                                    <div className="flex flex-col min-w-[100px]">
                                        <p className="text-sm text-neutral mb-1">Amount</p>
                                        <p className="text-base kati-font font-medium">{stake.amount}</p>
                                    </div>
                                </div>
                                <div className="  flex justify-between items-center">
                                    <div className="flex flex-col min-w-[100px]">
                                        <p className="text-sm text-neutral mb-1">Profit</p>
                                        <p className="text-base kati-font font-medium text-green-600">+ {stake.profit} MMP</p>
                                    </div>
                                </div>
                                <div className="  flex justify-between items-center">
                                    <div className="flex flex-col min-w-[100px]">
                                        <p className="text-sm text-neutral mb-1">Interest Rate</p>
                                        <p className="text-base kati-font font-medium">{stake.interestRate}</p>
                                    </div>
                                </div>
                                {stake.daysLeft && (
                                    <div className="  flex justify-between items-center">
                                        <div className="flex flex-col min-w-[100px]">
                                            <p className="text-sm text-neutral mb-1">Days Left</p>
                                            <p className="text-base kati-font font-medium">{stake.daysLeft}</p>
                                        </div>
                                    </div>
                                )}
                                {stake.showWithdrawals && (
                                    <div className="flex flex-1 justify-end items-center">
                                        <Button size="sm" className="bg-gradient-violet-blue border-none hover:bg-cyan-600 text-white px-8 py-[2px] text-sm rounded-full">
                                            Withdraw
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function StakeList() {
    const listTake = [
        {
            "Stake Name": "3 Months",
            "All Amount": "1,000 MMP",
            "Term": "2 Months",
            "Interest Rate": "10%",
            "stakes": [
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
        },
        {
            "Stake Name": "6 Months",
            "All Amount": "6,000 MMP",
            "Term": "6 Months",
            "Interest Rate": "22%",
            "stakes": [
                {
                    name: "Name123",
                    startDate: "24/02/2025",
                    dueDate: "24/05/2025",
                    profit: "0.1",
                    interestRate: "6%",
                    amount: "0.5 MMP",
                    daysLeft: "12 Days Left",
                },
            ]
        },
        {
            "Stake Name": "9 Months",
            "All Amount": "9,000 MMP",
            "Term": "9 Months",
            "Interest Rate": "34%",
            "stakes": [
                {
                    name: "Name123",
                    startDate: "24/02/2025",
                    dueDate: "24/05/2025",
                    profit: "0.1",
                    interestRate: "6%",
                    amount: "0.5 MMP",
                }
            ]
        },
        {
            "Stake Name": "12 Months",
            "All Amount": "12,000 MMP",
            "Term": "12 Months",
            "Interest Rate": "48%",
            "stakes": [
                {
                    name: "Name123",
                    startDate: "24/02/2025",
                    dueDate: "24/05/2025",
                    profit: "0.1",
                    interestRate: "6%",
                    amount: "0.5 MMP",
                }
            ]
        },
        {
            "Stake Name": "24 Months",
            "All Amount": "24,000 MMP",
            "Term": "24 Months",
            "Interest Rate": "130%",
            "stakes": [
            ]
        },
    ]

    return (
        <div className="space-y-4 h-[60vh] overflow-y-auto scrollbar-hide custom-scroll">
            {listTake.map((stakeGroup, index) => (
                <StakeGroup 
                    key={index}
                    stakeName={stakeGroup["Stake Name"]}
                    allAmount={stakeGroup["All Amount"]}
                    term={stakeGroup["Term"]}
                    interestRate={stakeGroup["Interest Rate"]}
                    stakes={stakeGroup.stakes}
                />
            ))}
        </div>
    )
}
