"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function GEG() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-5xl text-heading-600">Design System</h1>

      {/* Typography */}
      <section className="border-b border-b-heading-100 py-6">
        <h2 className="text-4xl text-heading-600">Typography</h2>
        <br />
        <br />
        <h3 className="underline text-3xl text-heading-600">Heading</h3>
        <br />
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
        <br />
        <br />
        <h3 className="underline text-3xl text-heading-600">Paragraph</h3>
        <br />
        <p>
          This is a paragraph demonstrating the typography of our design system.
          Use these styles to ensure consistent text appearance throughout your
          project.
        </p>

        <blockquote className="mt-6 border-l-2 pl-6 italic">
          &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
          it&apos;s only fair that they should pay for the privilege.&quot;
        </blockquote>
      </section>

      <section>
        <div className="my-6 w-full overflow-y-auto">
          <table>
            <thead>
              <tr>
                <th>King&apos;s Treasury</th>
                <th>People&apos;s happiness</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Empty</td>
                <td>Overflowing</td>
              </tr>
              <tr>
                <td>Modest</td>
                <td>Satisfied</td>
              </tr>
              <tr>
                <td>Full</td>
                <td>Ecstatic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Form Inputs Section */}
      <section className="section inputs">
        <h2 className="text-4xl text-heading-600">Form Inputs</h2>
        <form>
          <Input
            id="text"
            label="Text"
            type="text"
            className="mb-3"
            placeholder="Enter a text"
          />
          <Input
            id="email"
            label="Email"
            type="email"
            className="mb-3"
            placeholder="Enter an email"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            className="mb-3"
            placeholder="Enter a password"
          />
          <Input
            id="number"
            label="Number"
            type="number"
            className="mb-3"
            placeholder="Enter a number"
          />
          <Textarea
            id="textarea"
            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
          />
        </form>
      </section>

      {/* Tabs Section */}
      <section className="section tabs-section">
        <h2>Tabs</h2>
        <div className="tabs">
          <button
            className={activeTab === "tab1" ? "active" : ""}
            onClick={() => setActiveTab("tab1")}
          >
            Tab 1
          </button>
          <button
            className={activeTab === "tab2" ? "active" : ""}
            onClick={() => setActiveTab("tab2")}
          >
            Tab 2
          </button>
          <button
            className={activeTab === "tab3" ? "active" : ""}
            onClick={() => setActiveTab("tab3")}
          >
            Tab 3
          </button>
        </div>
        <div className="tab-content">
          {activeTab === "tab1" && <div>Content for Tab 1</div>}
          {activeTab === "tab2" && <div>Content for Tab 2</div>}
          {activeTab === "tab3" && <div>Content for Tab 3</div>}
        </div>
      </section>

      <section>
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          <div className="">01</div>
          <div className="">02</div>
          <div className="">03</div>
          <div className="">01</div>
          <div className="">02</div>
          <div className="">03</div>
          <div className="">01</div>
          <div className="">02</div>
          <div className="">03</div>
          <div className="">01</div>
          <div className="">02</div>
          <div className="">03</div>
          <div className="">01</div>
          <div className="">02</div>
          <div className="">03</div>
        </div>
      </section>
    </div>
  );
}
