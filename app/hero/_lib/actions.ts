"use server"

export type WaitlistState =
  | { status: "idle" }
  | { status: "error"; email: string; message: string }
  | { status: "success"; email: string }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function joinWaitlist(
  _previousState: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase()

  if (!emailPattern.test(email)) {
    return { status: "error", email, message: "Enter a valid email address." }
  }

  // TODO: persist the signup (database table, Resend audience, etc.).
  return { status: "success", email }
}
