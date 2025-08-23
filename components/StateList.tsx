import { getStates } from "@/data/db";
import StateFilter from "./StateFilter";

export default async function StateList() {
  const states = await getStates() as any[];

  return <StateFilter states={states} />;
}