const UserAvatar = ({ src, alt = 'Usuário', size = 'h-8 w-8' }) => {
  // `size` agora pode ser uma classe Tailwind como 'h-8 w-8'
  return (
    <img
      src={src}
      alt={alt}
      className={`${size} rounded-full object-cover border-2 border-white shadow-sm`}
    />
  );
};

export default UserAvatar;