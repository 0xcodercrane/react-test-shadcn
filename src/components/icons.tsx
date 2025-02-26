type IconProps = React.HTMLAttributes<HTMLImageElement>;
import Bitcoin from "./bitcoin.jpg";

export const Icons = {
  logo: (props: IconProps) => (
    <div className="w-10 h-10 rounded-full overflow-hidden">
      <img
        src={Bitcoin}
        className="w-full h-full object-cover"
        alt="Logo"
        {...props}
      />
    </div>
  ),
  bitcoin: (props: IconProps) => (
    <div className="flex items-center p-1 bg-white rounded-full">
      <div className="w-12 h-12 rounded-full overflow-hidden">
        <img
          src={Bitcoin}
          className="w-full h-full object-cover"
          alt="Logo"
          {...props}
        />
      </div>
    </div>
  ),
};
