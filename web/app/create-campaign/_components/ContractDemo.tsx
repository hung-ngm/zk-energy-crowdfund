import { clsx } from 'clsx';
import useOnchainCoffeeMemos from '../_hooks/useOnchainCoffeeMemos';
import FormCreateCampaign from './FormCreateCampaign';

export default function BuyMeCoffeeContractDemo() {
  const { refetchMemos } = useOnchainCoffeeMemos();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        className={clsx([
          'w-full max-w-2xl',
          'rounded-lg border border-solid border-boat-color-palette-line',
          'bg-boat-color-palette-backgroundalternate p-10', // Adjust the left margin
        ])}
      >
        <br/>
        <FormCreateCampaign refetchMemos={refetchMemos} />
      </div>
    </div>
  );
}
