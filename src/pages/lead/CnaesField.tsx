import { useEffect, useState } from "react";
import { getInfoFields } from "../../api/api";

export default function CnaeFilter() {
  const [allCnaes, setAllCnaes] = useState([]);
  const [allMunicipios, setAllMunicipios] = useState([]);

  useEffect(() => {
    const load = async () => {
      const result = await getInfoFields();
      setAllCnaes(result.data.cnaes);
      setAllMunicipios(result.data.municipios);
    };
    load();
  }, []);
}