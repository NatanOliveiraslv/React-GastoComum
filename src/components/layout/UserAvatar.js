const UserAvatar = ({ userId, alt = 'Usuário', size = 'h-8 w-8' }) => {

  const avatartUrl = `${process.env.REACT_APP_BASE_URL}/user/profile-picture/download/${userId}` 

  // `size` agora pode ser uma classe Tailwind como 'h-8 w-8'
  return (
    <img
      src={avatartUrl}
      alt={alt}
      className={`${size} rounded-full object-cover border-2 border-white shadow-sm`}
    />
  );
};

export default UserAvatar;