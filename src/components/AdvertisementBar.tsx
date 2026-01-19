const AdvertisementBar = () => {
const message = "🎉 Free Shipping on Orders Over $50! Shop Now and Save Big • New Arrivals Every Week • Limited Time Offers Available •";

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="text-sm font-medium pr-12">
          {message}
        </span>
        <span className="text-sm font-medium pr-12" aria-hidden="true">
          {message}
        </span>
      </div>
    </div>
  );
};

export default AdvertisementBar;

