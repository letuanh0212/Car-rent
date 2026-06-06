export default function DetailVideo({ videos }) {
  if (!videos?.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-(--color-text-primary)">
        Vehicle Video
      </h2>

      <div className="overflow-hidden rounded-2xl border border-(--color-border)">
        <div className="aspect-video">
          <iframe
            src={videos[0].youtube_url}
            title="Vehicle Video"
            className="h-full w-full"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}