/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useCallback } from 'react';
// import clsx from 'clsx';
import { parseEther } from 'viem';
import Button from '@/components/Button/Button';
import { useERC20Token } from '../_contracts/useERC20Token';
import { useZKGreenEnergyCrowdFunding } from '../_contracts/useZKGreenEnergyCrowdFunding';
import useCampaignTotalSupply from '../_hooks/useCampaignTotalSupply';
import useFields from '../_hooks/useFields';
import ContractAlert from './ContractAlert';
import InputText from './InputText';
import Label from './Label';
// import TextArea from './TextArea';
// import TransactionSteps from './TransactionSteps';
import useSmartContractForms from './useSmartContractForms';

const GAS_COST = 0;

const initFields = {
  amount: 0
};

type Fields = {
  amount: number;
};

type FormCampaignDetailsProps = {
  address: `0x${string}`,
  refetchTotalSupply: ReturnType<typeof useCampaignTotalSupply>['refetchTotalSupply'];
};

function FormCampaignDetails({ address }: FormCampaignDetailsProps) {
  const contract = useZKGreenEnergyCrowdFunding(address);

  console.log("contract", contract);

  const erc20Contract = useERC20Token();

  const { fields, setField, resetFields } = useFields<Fields>(initFields);

  const reset = useCallback(async () => {
    resetFields();
    // await refetchTotalSupply();
  }, [resetFields]);

  const {
    disabled: erc20Disabled,
    transactionState: erc20TransactionState,
    onSubmitTransaction: erc20OnSubmitTransaction
  } = useSmartContractForms({
    gasFee: parseEther(String(0)),
    contract: erc20Contract,
    name: 'approve',
    arguments: [address, fields.amount],
    enableSubmit: true,
    reset,
  })

  const names = ["Wind energy turbine crowdfunding"];
  const description = ['A wonderful world of green energy'];
  const dates = ['2024-12-12'];

  const { disabled, onSubmitTransaction } =
    useSmartContractForms({
      gasFee: parseEther(String(GAS_COST)),
      contract: contract,
      name: 'contributeERC20',
      arguments: [fields.amount],
      enableSubmit: true,
      reset,
    });

  if (erc20TransactionState !== null) {
    console.log("erc20TransactionState", erc20TransactionState)
    return (
      <>
        <form onSubmit={onSubmitTransaction} className="w-full">
          <div className="my-4 items-center lg:flex lg:gap-4">
            <div className="text-center text-4xl lg:text-left">☕</div>
            <div className="mb-4 mt-2 text-center font-sans text-xl lg:my-0 lg:text-left">X</div>
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
        <div className="my-4 items-center lg:flex lg:gap-4">
          <div className="text-center text-4xl lg:text-left">⭐️</div>
          <div className="mb-4 mt-2 text-center font-sans text-xl lg:my-0 lg:text-left">Project Detail</div>
        </div>
        <div>
          <div className="mb-5">
            <Label htmlFor="name">Name</Label>
            <InputText
              onChange={(() => console.log("name"))}
              id="name"
              placeholder={names[Math.floor(Math.random() * names.length)]}
              disabled={!disabled}
              required
            />
          </div>
          <div className="mb-5">
            <Label htmlFor="description">Description</Label>
            <InputText
              onChange={(() => console.log("description"))}
              id="description"
              placeholder={description[Math.floor(Math.random() * description.length)]}
              disabled={!disabled}
              required
            />
          </div>
          <div className="mb-5">
            <Label htmlFor="endDate">End date</Label>
            <InputText
              onChange={(() => console.log("endDate"))}
              id="endDate"
              placeholder={dates[Math.floor(Math.random() * dates.length)]}
              disabled={!disabled}
              required
            />
          </div>
          <div className="mb-5">
            <Label htmlFor="targetFund">Target fund</Label>
            <InputText
              onChange={(() => console.log("targetFund"))}
              id="targetFund"
              placeholder={address}
              disabled={!disabled}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <br />
      <h2 className="mb-5 w-full text-center text-2xl font-semibold text-white lg:text-left">
        Campaign Details Page
      </h2>

      <form onSubmit={erc20OnSubmitTransaction} className="w-full">
        <div className="my-4 items-center lg:flex lg:gap-4">
          <div className="text-center text-4xl lg:text-left">☕</div>
          <div className="mb-4 mt-2 text-center font-sans text-xl lg:my-0 lg:text-left">Contribute</div>
        </div>

        <div>
          <div className="mb-5">
            <Label htmlFor="name">Approve USDC/USDT to contribute to the project</Label>
            <InputText
              id="amount"
              placeholder="amount"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onChange={(evt) => setField('amount', Number(evt.target.value))}
              disabled={erc20Disabled}
              required
            />
          </div>

          <ContractAlert contract={contract} amount={GAS_COST} />
          <Button
            buttonContent={
              <>
                Approve {String(fields.amount)} USDC to contribute to the project
              </>
            }
            type="submit"
            disabled={erc20Disabled}
          />
        </div>
      </form>

      <div className="my-4 items-center lg:flex lg:gap-4">
        <div className="text-center text-4xl lg:text-left">⭐️</div>
        <div className="mb-4 mt-2 text-center font-sans text-xl lg:my-0 lg:text-left">Project Detail</div>
      </div>
      <div>
        <div className="mb-5">
          <Label htmlFor="name">Name</Label>
          <InputText
            onChange={(() => console.log("name"))}
            id="name"
            placeholder={names[Math.floor(Math.random() * names.length)]}
            disabled={!disabled}
            required
          />
        </div>
        <div className="mb-5">
          <Label htmlFor="description">Description</Label>
          <InputText
            onChange={(() => console.log("description"))}
            id="description"
            placeholder={description[Math.floor(Math.random() * description.length)]}
            disabled={!disabled}
            required
          />
        </div>
        <div className="mb-5">
          <Label htmlFor="endDate">End date</Label>
          <InputText
            onChange={(() => console.log("endDate"))}
            id="endDate"
            placeholder={dates[Math.floor(Math.random() * dates.length)]}
            disabled={!disabled}
            required
          />
        </div>
        <div className="mb-5">
          <Label htmlFor="targetFund">Target fund</Label>
          <InputText
            onChange={(() => console.log("targetFund"))}
            id="targetFund"
            placeholder={address}
            disabled={!disabled}
          />
        </div>
      </div>
    </>
  );
}

export default FormCampaignDetails;