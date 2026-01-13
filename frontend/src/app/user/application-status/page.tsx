"use client";

import { useEffect, useState } from "react";

type Status = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

export default function ApplicationStatusPage() {
  const [status, setStatus] = useState<Status>("PENDING");
  const [reason, setReason] = useState<string>("");

  // Mock API call (replace with real API)
  useEffect(() => {
    setTimeout(() => {
      setStatus("PENDING");
      // setStatus("APPROVED");
      // setStatus("REJECTED");
      setReason("GST number does not match government records.");
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-slate-800">
          Application Status
        </h1>
        <p className="text-slate-500 mt-2">
          Track your registration review progress
        </p>

        {/* Status Indicator */}
        <div className="mt-8">
          {status === "PENDING" && (
            <StatusCard
              color="blue"
              title="Verification in Progress"
              description="Your business profile is currently under review. This usually takes 24–48 hours."
            />
          )}

          {status === "APPROVED" && (
            <StatusCard
              color="green"
              title="Application Approved"
              description="Your account has been approved. You can now access the platform."
            >
              <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg transition">
                Go to Dashboard
              </button>
            </StatusCard>
          )}

          {status === "REJECTED" && (
            <StatusCard
              color="red"
              title="Application Rejected"
              description="Unfortunately, we could not approve your application."
            >
              <div className="mt-4 text-left bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                <strong>Reason:</strong> {reason}
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition">
                  Update Details
                </button>
                <button className="border border-slate-300 hover:bg-slate-50 text-slate-700 py-2.5 rounded-lg transition">
                  Contact Support
                </button>
              </div>
            </StatusCard>
          )}

          {status === "SUSPENDED" && (
            <StatusCard
              color="yellow"
              title="Account Suspended"
              description="Your account has been temporarily suspended. Please contact support."
            />
          )}
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-slate-400">
          Polymer Trading Platform © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

function StatusCard({
  color,
  title,
  description,
  children,
}: {
  color: "blue" | "green" | "red" | "yellow";
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="mt-6">
      <div
        className={`mx-auto w-fit px-4 py-1 rounded-full text-sm font-medium ${colors[color]}`}
      >
        {title}
      </div>

      <p className="mt-4 text-slate-600">{description}</p>

      {children}
    </div>
  );
}