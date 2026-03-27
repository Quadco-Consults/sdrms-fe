"use client";

export default function DebugEnv() {
  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>Environment Debug</h1>
      <pre>
        {JSON.stringify(
          {
            NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE,
            isDemoMode: process.env.NEXT_PUBLIC_DEMO_MODE === "true",
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}
