import { ReserveSeatButton } from "@/components/ReservationWizard";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/5">
      <div className="vc-container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg gradient-bg" />
          <span className="font-bold tracking-tight">AI:BN</span>
        </div>
        <ReserveSeatButton className="btn-secondary !py-2.5 !px-5 !text-sm">
          Reserve Your Seat
        </ReserveSeatButton>
      </div>
    </header>
  );
}
