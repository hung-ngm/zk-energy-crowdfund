import { CheckIcon } from '@radix-ui/react-icons';

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="inline-flex items-center justify-start gap-4">
      <CheckIcon width="24" height="24" />
      <span className="font-inter text-xl font-normal leading-7 text-white">{children}</span>
    </li>
  );
}

export default function HomeMain() {
  return (
    <section className="mb-12 flex flex-col items-center justify-center">
      <div className="w-full md:w-4/5">
        <h2 className="mb-10 text-center text-xl font-medium text-white md:text-2xl lg:text-3xl">
          A hackathon project that demonstrates the power of blockchain in crowdfunding for public good.
        </h2>
        <ul className="items-left flex flex-col justify-center gap-4">
          <ListItem>
            WorldCoin for proof of humanity to fight against bot-based fraudulent projects.
          </ListItem>
          <ListItem>
            Smart Wallet and Account abstraction for gasless transactions.
          </ListItem>
          <ListItem>
            Implement ZK circuit and smart contract to verify project's legitimacy without disclosing NDA data.
          </ListItem>
        </ul>
      </div>
    </section>
  );
}
