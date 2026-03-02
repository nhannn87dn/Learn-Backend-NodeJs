import { useAuthStore } from "../../stores/useAuthStore"

const HeaderDefault = () => {
  const {user} = useAuthStore();
  return (
    <div>
      Hello {user?.fullName}
    </div>
  )
}

export default HeaderDefault