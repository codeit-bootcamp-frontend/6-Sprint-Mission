
import { useRouter } from "next/router";

export default function Item() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <h2>{id}아이템</h2>
    </>
  );
}
