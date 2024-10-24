import { Card } from "./Card";

export default function Cards() {
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 md:col-span-2 gap-2">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}
