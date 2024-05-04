import { useCallback } from 'react';
import clsx from 'clsx';
import { parseEther } from 'viem';
import Button from '@/components/Button/Button';
import { useZKGreenEnergyCrowdFunding } from '../_contracts/useZKGreenEnergyCrowdFunding';
import useFields from '../_hooks/useFields';
import ContractAlert from './ContractAlert';
import InputText from './InputText';
import Label from './Label';
import TextArea from './TextArea';
import TransactionSteps from './TransactionSteps';
import useSmartContractForms from './useSmartContractForms';

const GAS_COST = 0.0001;
const COFFEE_COUNT = [1, 2, 3, 4];

const initFields = {
  amount: 0
};

type Fields = {
  amount: number;
};

type FormCampaignDetailsProps = {
  address: `0x${string}`
  // refetchMemos: ReturnType<typeof useOnchainCoffeeMemos>['refetchMemos'];
};

function FormCampaignDetails({ address }: FormCampaignDetailsProps) {
  const contract = useZKGreenEnergyCrowdFunding(address);

  const { fields, setField, resetFields } = useFields<Fields>(initFields);

  const reset = useCallback(async () => {
    resetFields();
    // await refetchMemos();
  }, [refetchMemos, resetFields]);

  const { disabled, transactionState, resetContractForms, onSubmitTransaction } =
    useSmartContractForms({
      gasFee: parseEther(String(GAS_COST)),
      contract,
      name: 'contributeERC20',
      arguments: [fields.amount],
      enableSubmit: true,
      reset,
    });

  if (transactionState !== null) {
    return (
      <TransactionSteps
        transactionStep={transactionState}
        coffeeCount={fields.coffeeCount}
        resetContractForms={resetContractForms}
        gasCost={GAS_COST}
      />
    );
  }

  return (
    <>
      <h2 className="mb-5 w-full text-center text-2xl font-semibold text-white lg:text-left">
        Buy Me a Coffee!
      </h2>
      <form onSubmit={onSubmitTransaction} className="w-full">
        <div className="my-4 items-center lg:flex lg:gap-4">
          <div className="text-center text-4xl lg:text-left">☕</div>
          <div className="mb-4 mt-2 text-center font-sans text-xl lg:my-0 lg:text-left">X</div>
          <div className="mx-auto flex max-w-[300px] gap-3 lg:max-w-max">
            {/* {COFFEE_COUNT.map((count) => (
              <button
                key={`num-coffee-btn-${count}`}
                type="button"
                className={clsx(
                  `${
                    fields.coffeeCount === count
                      ? 'bg-gradient-2'
                      : 'border border-boat-color-orange'
                  } block h-[40px] w-full rounded lg:w-[40px]`,
                )}
                // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                onClick={() => setField('coffeeCount', count)}
              >
                {count}
              </button>
            ))} */}
          </div>
        </div>

        <div>
          <div className="mb-5">
            <Label htmlFor="name">Contribute USDC/USDT to the project</Label>
            <InputText
              id="amount"
              placeholder="amount"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onChange={(evt) => setField('amount', Number(evt.target.value))}
              disabled={disabled}
              required
            />
          </div>

          <ContractAlert contract={contract} amount={GAS_COST} />
          <Button
            buttonContent={
              <>
                Contribute {String(fields.amount)} USDC to the project
              </>
            }
            type="submit"
            disabled={disabled}
          />
        </div>
      </form>
    </>
  );
}

export default FormCampaignDetails;