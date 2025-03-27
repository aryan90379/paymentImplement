import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import PaymentPage from "@/components/PaymentPage";

const Username = async ({ params }) => {
  await connectToDatabase();

  const user = await User.findOne({ username: params.username });

  if (!user) {
    return notFound();
  }

  return <PaymentPage params={params} />;
};

export default Username;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function generateMetadata({ params }) {
  const capitalizedUsername = capitalizeFirstLetter(params.username);
  return {
    title: `Support ${capitalizedUsername}`,
  };
}