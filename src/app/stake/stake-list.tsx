import { Button } from "@/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { getListStaking, getStakingPlans } from "@/services/api/StakingService"
import { useState, useEffect } from "react"
import { useLang } from "@/lang/useLang"
import { useStakingContext } from "@/contexts/StakingContext"
import { useAuth } from "@/hooks/useAuth"

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

// Utility function to calculate days between two dates
const calculateDaysLeft = (endDate: string): number => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

// Utility function to calculate profit
const calculateProfit = (amountStaked: string, interestRate: number, startDate: string, endDate: string): string => {
    const amount = parseFloat(amountStaked);
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    // Calculate total days of staking period
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    // Calculate days elapsed
    const daysElapsed = Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    // Calculate profit based on elapsed time
    const profit = (amount * interestRate / 100);

    return profit.toFixed(2);
};

// Utility function to format date
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
};

// Utility function to format amount
const formatAmount = (amount: string): string => {
    return `${parseFloat(amount).toFixed(2)} MMP`;
};

function StakeGroup({
    stakeName,
    allAmount,
    term,
    interestRate,
    stakes,
}: StakeGroupProps) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);
    const { t } = useLang();
    const withdrawableCount = stakes.filter(stake => stake.showWithdrawals).length
    const { loginMethod } = useAuth()

    const toggleExpanded = () => {
        setHasInteracted(true);
        setIsExpanded(!isExpanded);
    };

    // Determine background based on priority: stakes?.length first, then isExpanded
    const shouldShowBackground = hasInteracted ? isExpanded : (stakes?.length > 0);

    return (
        <div>
            <div
                className={`flex flex-col justify-between sm:flex-row border-blue-400/50 border border-[#5558FF] border-solid rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 backdrop-blur-sm hover:border-blue-400/70 transition-all duration-300 cursor-pointer ${shouldShowBackground ? 'bg-gradient-purple-cyan-0deg' : 'bg-transparent'}`}
                onClick={toggleExpanded}
            >
                {/* Mobile: Stack vertically, Desktop: Row layout */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center sm:w-[40px] ">
                        <ChevronDown
                            className={`w-4 h-4 text-neutral transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        />
                    </div>

                    <div className="flex flex-1 sm:gap-2 sm:flex-col sm:mr-10 items-center sm:items-start gap-3">
                        <p className="text-sm sm:text-base kati-font font-medium">{t(`stake.${stakeName}`)}</p>
                        <p className="text-xs text-neutral bg-green-700 max-w-[100px] flex items-center justify-center rounded-full px-2 py-1 mb-0 p-0">
                            {stakes?.length ?? 0} {t("stake.stakes")}
                        </p>
                    </div>
                </div>

                {/* Mobile: Grid layout, Desktop: Row layout */}
                <div className="grid grid-cols-2 sm:flex sm:flex-1 sm:justify-between sm:items-center gap-2 sm:gap-0 mt-2 sm:mt-0">
                    <div className="flex flex-col">
                        <p className="text-xs sm:text-sm text-neutral mb-1">{t("stake.allAmount")}</p>
                        <p className="text-sm sm:text-base kati-font font-medium text-neutral">{allAmount}</p>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-xs sm:text-sm text-neutral mb-1">{t("stake.term")}</p>
                        <p className="text-sm sm:text-base kati-font font-medium">{term}</p>
                    </div>

                    <div className="flex flex-col">
                        <p className="text-xs sm:text-sm text-neutral mb-1">{t("stake.interestRate")}</p>
                        <p className="text-sm sm:text-base kati-font font-medium text-green-600">+ {interestRate}</p>
                    </div>
                </div>
            </div>

            {stakes.length > 0 && isExpanded && (
                <div className="">
                    {stakes.map((stake, index) => (
                        <div key={index} className="mb-3 sm:mb-4 last:mb-0 bg-black/50 rounded-lg p-3 sm:p-5">
                            {/* Mobile: Stack dates vertically, Desktop: Row */}
                            <div className="flex flex-col sm:flex-row sm:gap-10 items-start sm:items-center mb-2">
                                <span className="text-xs italic text-neutral mb-1">{t("stake.startDate")} {stake.startDate}</span>
                                <span className="text-xs italic text-neutral mb-1">{t("stake.dueDate")} {stake.dueDate}</span>
                            </div>

                            {/* Mobile: Grid 2x2, Desktop: Row layout */}
                            <div className=" sm:flex sm:gap-16 justify-between gap-3">
                                <div className="flex flex-1 gap-[8%] sm:flex-nowrap flex-wrap">
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col min-w-[80px] sm:min-w-[100px]">
                                            <p className="text-xs sm:text-sm text-neutral mb-1">{t("stake.amount")}</p>
                                            <p className="text-xs sm:text-sm kati-font font-medium bg-gradient-purple-cyan bg-clip-text">{stake.amount}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col min-w-[80px] sm:min-w-[100px]">
                                            <p className="text-xs sm:text-sm text-neutral mb-1">{t("stake.profit")}</p>
                                            <p className="text-xs sm:text-sm kati-font font-medium text-green-600">+ {stake.profit} MMP</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col min-w-[80px] sm:min-w-[100px]">
                                            <p className="text-xs sm:text-sm text-neutral mb-1">{t("stake.interestRate")}</p>
                                            <p className="text-xs sm:text-sm kati-font font-medium">{stake.interestRate}</p>
                                        </div>
                                    </div>
                                    {stake.daysLeft && (
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col min-w-[80px] sm:min-w-[100px]">
                                                <p className="text-xs sm:text-sm text-neutral mb-1">{t("stake.daysLeft")}</p>
                                                <p className="text-xs sm:text-sm kati-font font-medium">{stake.daysLeft}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {
                                    loginMethod == "phantom" && stake.showWithdrawals && (
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col min-w-[80px] h-8 sm:min-w-[100px]">
                                                <Button variant="outline" size="sm" className="bg-gradient-purple-cyan text-white rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                                    {t("stake.withdraw")}
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function StakeList() {
    const { t } = useLang();
    const { refreshTrigger } = useStakingContext();

    const { data: listStaking, isLoading, error, refetch: refetchListStaking } = useQuery({
        queryKey: ["list-staking"],
        queryFn: getListStaking,
    })

    const { data: stakingPlans, refetch: refetchStakingPlans } = useQuery({
        queryKey: ["staking-plans"],
        queryFn: getStakingPlans,
    })

    // Lắng nghe thay đổi từ Context và refetch data
    useEffect(() => {
        if (refreshTrigger > 0) {
            refetchListStaking();
            refetchStakingPlans();
        }
    }, [refreshTrigger, refetchListStaking, refetchStakingPlans]);

    // Process API data and group by staking plan
    const processStakingData = () => {
        if (!listStaking || !Array.isArray(listStaking)) {
            return [];
        }

        if (!stakingPlans || !Array.isArray(stakingPlans)) {
            return [];
        }
        const newData = stakingPlans.map((plan: any) => ({
            periodDays: plan.period_days,
            name: plan.name,
            interestRate: plan.interest_rate
        }))

        // Initialize all stake types with empty data
        const groupedStakes = newData.reduce((acc, stakeType) => {
            acc[stakeType.periodDays] = {
                planName: stakeType.name,
                periodDays: stakeType.periodDays,
                stakes: [],
                totalAmount: 0,
                interestRate: stakeType.interestRate
            };
            return acc;
        }, {} as any);

        // Process actual staking data and group by staking_plan.period_days
        listStaking.forEach((stake: any) => {
            const periodDays = stake.staking_plan?.period_days;

            // Only process if this period days exists in our defined stake types
            if (groupedStakes[periodDays]) {
                // Calculate profit and days left
                const profit = calculateProfit(
                    stake.amount_staked,
                    stake.staking_plan?.interest_rate || 0,
                    stake.start_date,
                    stake.end_date
                );

                const daysLeft = calculateDaysLeft(stake.end_date);
                const isWithdrawable = daysLeft <= 0 && stake.status === 'active';

                groupedStakes[periodDays].stakes.push({
                    name: `Stake ${stake.id}`,
                    startDate: formatDate(stake.start_date),
                    dueDate: formatDate(stake.end_date),
                    profit,
                    interestRate: `${stake.staking_plan?.interest_rate || 0}%`,
                    amount: formatAmount(stake.amount_staked),
                    daysLeft: daysLeft > 0 ? `${daysLeft} ${t("stake.days")}` : undefined,
                    showWithdrawals: isWithdrawable
                });

                groupedStakes[periodDays].totalAmount += parseFloat(stake.amount_staked);
                groupedStakes[periodDays].interestRate = stake.staking_plan?.interest_rate || 0;
            }
        });
        console.log("groupedStakes", groupedStakes)
        // Convert to array format expected by component
        return Object.values(groupedStakes).map((group: any) => ({
            stakeName: group.planName,
            allAmount: `${group.totalAmount.toFixed(2)} MMP`,
            term: `${group.periodDays / 30} ${t("stake.months")}`,
            interestRate: `${group.interestRate}%`,
            stakes: group.stakes
        }));
    };

    const processedStakes = processStakingData();

    if (isLoading) {
        return <div className="flex justify-center items-center h-[60vh] text-sm sm:text-base">{t("stake.loading")}</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-[60vh] text-red-500 text-sm sm:text-base">{t("stake.errorLoadingStakingData")}</div>;
    }

    console.log("window.innerHeight", window.innerHeight)

    return (
        <div className={`space-y-3 sm:space-y-4 ${window.innerHeight < 870 ? 'h-[60vh]' : 'h-[70vh]'} overflow-y-auto scrollbar-hide custom-scroll`}>
            {processedStakes.length > 0 ? (
                processedStakes.map((stakeGroup, index) => (
                    <StakeGroup
                        key={index}
                        stakeName={stakeGroup.stakeName}
                        allAmount={stakeGroup.allAmount}
                        term={stakeGroup.term}
                        interestRate={stakeGroup.interestRate}
                        stakes={stakeGroup.stakes}
                    />
                ))
            ) : (
                <div className={`flex justify-center items-center ${window.innerHeight < 870 ? 'h-[60vh]' : 'h-[70vh]'} text-neutral text-sm sm:text-base`}>
                    {t("stake.noStakingDataAvailable")}
                </div>
            )}
        </div>
    )
}
