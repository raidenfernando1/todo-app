import Notes from "./component/Notes";
import Navbar from "./component/Navbar";
import { Card } from "./component/Card";

export default function Main() {
  return (
    <main>
      <Navbar />
      <Notes>
        {/* PLACEHOLDER! */}
        <Card title="PLACEHOLDER TITLE" content="PLACEHOLDER CONTENT" />
      </Notes>
    </main>
  );
}
