import { motion } from "framer-motion";
import TextWidget from "./TextWidget";
import ProductScroll from "./ProductScrollView";

function ReportPage() {
  const sampleProducts = [
    {
      id: "1",
      image:
        "https://www.cerave.hk/en-hk/-/media/Project/Loreal/BrandSites/CeraVe/Master/CeraveAPAC/Hong-Kong/Shared/packshots/moisturising-lotion-16oz-new.png?h=559&la=en-HK&w=447&hash=72F286FCD7925B2CB2BFB9A9B41BD62B5F312168",
      title: "Product 1",
      description: "A great product for your needs!",
    },
    {
      id: "2",
      image:
        "https://www.cerave.hk/en-hk/-/media/Project/Loreal/BrandSites/CeraVe/Master/CeraveAPAC/Hong-Kong/Shared/packshots/moisturising-lotion-16oz-new.png?h=559&la=en-HK&w=447&hash=72F286FCD7925B2CB2BFB9A9B41BD62B5F312168",
      title: "Product 2",
      description: "Another fantastic option!",
    },
    {
      id: "3",
      image:
        "https://www.cerave.hk/en-hk/-/media/Project/Loreal/BrandSites/CeraVe/Master/CeraveAPAC/Hong-Kong/Shared/packshots/moisturising-lotion-16oz-new.png?h=559&la=en-HK&w=447&hash=72F286FCD7925B2CB2BFB9A9B41BD62B5F312168",
      title: "Product 3",
      description: "Top pick from AI recommendations!",
    },
  ];
  return (
    <div className="flex justify-center flex-col h-screen w-screen items-center space-y-3 p-6 bg-gray-200 gap-4 font-menlo">
      <motion.span className="bg-gradient-to-r from-purple-600 via-red-500 to-amber-400 bg-clip-text text-transparent text-3xl mb-2">
        Dermafyr
      </motion.span>
      <TextWidget text="welcome to the jungle to the jungle to the jungle to the jungle to the jungle to the jungle to the jungle to the jungle to the jungle to the jungle to the jungle to the jungle to the jungle to the jungle to the jungle" />
      <ProductScroll products={sampleProducts} />
    </div>
  );
}

export default ReportPage;
