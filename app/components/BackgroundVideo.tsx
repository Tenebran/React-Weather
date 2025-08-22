'use client';

type Props = {
  src: string;
  children: React.ReactNode;
};

export default function BackgroundVideo({ src, children }: Props) {
  return (
    <div className="relative min-h-screen">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10">
        <source src={`${src}.webm`} type="video/webm" />
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>

      <div className="fixed inset-0 bg-black/30 -z-10" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
