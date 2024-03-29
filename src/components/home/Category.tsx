import { ProCard } from "@ant-design/pro-components";
import { Card, Col, Row } from "antd";

interface CategoryType {
    type: string,
    imgUrl: string,
    label: string
}

const categories: CategoryType[] = [
    {
        type: "FOOD",
        imgUrl: "https://womensfitness.co.uk/wp-content/uploads/sites/3/2022/11/Shutterstock_1675475479.jpg?w=900",
        label: "Đồ ăn sạch"
    },
    {
        type: "ELECTRONICS",
        imgUrl: "data:image/jpeg;base64,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",
        label: "Đồ điện tử"
    },
    {
        type: "CLOTHING",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5yFEEaLV5sTkXmHgAz2zbBIVfsWDRbtkW3w&usqp=CAU",
        label: "Quần áo"
    },
    {
        type: "BOOKS",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3AvmknhG6M-QC8Fj1Qx7Sf3eZEgjKMk3NTNUpTX8aS7YdABXnbYhSwYoMA5yG3bHxl1g&usqp=CAU",
        label: "Sách"
    },
    {
        type: "SPORTS",
        imgUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxETEhASEBIPEhIQDxUVDxUQExAQDxUQFRcWFxYVFhkYHSggGBolHRMVITEiJSkrLi4uGB8zODMsNygtLjcBCgoKDg0OFg8QFysdFR0rKy0tLSsrLTcrLSstKy0rKysrKy0tKystNysrNys3LS0tNzctLSstLSsrKystKysrK//AABEIAMYA/wMBIgACEQEDEQH/xAAcAAEAAAcBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xABAEAACAQIDBQQHBwIDCQAAAAAAAQIDEQQhMQUGEkFRBxNhcTJScoGRobEiI0JiwdHwgpIUU6IWJDNEc4PC4fH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAZEQEBAQEBAQAAAAAAAAAAAAAAARExIRL/2gAMAwEAAhEDEQA/AO4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASymlqBMQbKMqj5ZfU1TfDe6GEXdw4Z4hr0XnGC6z/AEQG2zrxWrS88imsdT5Tj/dH9zz7tDaFWtOVSrOU5Sed728kuS8ClGhPlFmvlNejI1k9L+7MiqqPPVJV45xdSL/LNxfyZu/Z5tiu67o4irUnGdOXdqpJztONnk3n6KkSw11BMiWlieNZrXP6kVcAljJPQmAAAAAAAAAAAAAAAAAAAAAAAAAAFKvWUV4vQCNSpbJalG/XUpxlf9ydEFlturXjQqywtNVKyj93FyjG+ebV8m0rtJ2u0kcbp4RTnU7yVR1VJ99GqnCtGb14080/l0O6IxO3d28NiuCVWLVWn/w6tN8FaK5xv+KL9WV1ztdIsK5hTw0I6JEXEy21NgYnDSfHCVejlw1sPCUpp55VKMbyT0s4cV78i52fuziaufd91F/ixDcJWsmmqcU5PW1pODyZrWcazUTLnd+s4YvCN6vERilo3x3i7dcpG94Tciis69SpV/LD/d6V17D435ObTM3gNkYein3NGlTv6ThCKlK3rS1fvZNXF20SshJW006ft+xByIqF2s0XVGqpea1RZyZTc2ndar+WAygKdCqpJNf/AB9CoAAAAAAAAAAAAAAAAAAAAAAS1JpJtuySu29Elqctxe2amL2hQpwlJQdW7SeSoU05yT9pRUW+szae0Xa3c4ZxTtKq7f0rX9F8TQey5d5isVWav3VGFOL8asnKS+FKHxJVjrEZFRMtIzKsZhFxGROmUFIjxgVJvTxfyKpacefkvDV/Mn7wouGSSkUu9JHUAqNlKXVe/wAf5ZEHMlcgDnf+WZSlI0TtP3xq4FU1Q4O8qLSSvlnn8vmjQ8N2xYxP7ynSkvC6ZB3nBYnhlZ+jJ/B6X+hlzk26G/1PHSdJwdOo6blBXbUlFpySdtUs7dEzqGzsRx04y56S81/L+8SrZi5ABUAAAAAAAAAAAAAAAAAABxrth2p984XypxUV56v5sm7HKbWExFV61cZK3swp00vm5GC30wtTF7QeHg7OrWk5S1VOlF3nP3LJdW0uZ0LZOz6VCnClho93GmrRi3lPm3Jv8bbb4ud/hltnI1CtGoYylXv1TWqeTT8StGqIzWRVQmVQxGO2pSowlUrTjCEVeTk7Kxyvertdk+KngoWjp3lS/E/KPL4lR2mnUvxPTO2fDfJdVqsyLmee9ze0WtRrp15J06j+9dnxNuyT1smvWebtZvS3c8BtGnWpxqUpKUZK6a+nmUZDjIOZb94Q7wC4ciDkW/eEFUA4j224/jxqprSjRin0vK8uvic0cjPb3bSWIxuMrJ3jOvLgf5I/Zi/gkYGUHd2TEVnN1tqPD16Nb/Jqxk/+m8pr+1yR6k3ar37yN7rKS+jf0PJGEg+a5ZnpHswxznRwcm7uWGUJPrKC4W/jTZmdavHQwAaYAAAAAAAAAAAAAAAAAABzDBbKcMTja00uKpW4KXhQj9r3XnKV/ZiZVMvNpUrVJ+0/g8yzkjLSZzT9K91pJekvB9Ua/vZvjSwMbS+8rTjelCGjWnFJ/hXzyM4zl/bDs/7eFrr8UZUpdbxfFH5OQwaPvDvJicXPirzbSbcIRuqUfJfq7vxMRWeZdrD9SWeGNxlZXNv3H33q4KajK86MrKUbu8fGPK/n0satLDyXiSqmyo9SbJ2tSxFONWjNShLRrrzT6MupVUuZxjsd7/v6ijOSoKlxVo8uK9oWvpJ559E/A64klpFX6yvJ8uvkjKq6xF/RUpeym1y1ei1Rb7QVWVKpGE6dOcqclTcnKfDNp8LfAnknbmTSqN6tkjQHmzbGya2FqTo1ouM4e+Li9JRfOLWaf6posHWZ6B3w3bhjaXC7RqwT7mb0TesJfkb6aPPqnwTauz6lCpOnUi4yhK0k9U/59UF1Lh6rcl5nfOx5SWHwvEmvvKnBfnBzlZ+WbORbibsTxlZXuqNN3rS8PVXiz0Lu9hVGpRjFJRhlFLRRjF2XwSM561vjdAAaYAAAAAAAAAAAAAAAAAABgduUbT4vWXzWX7GIlE2jatDig3zjmvLn/PA1ycSNRb8JrPaDs7vcFVss6TVWP9N1Ln6rZtTRSqwTTTzUk09dHk/qRHnZwJeAye2Nnyo1qtKSd6c3FX5xWj96syxcTaKPAS92V2i62VgXWrUqKv8Ae1Ixy1SbzfuV37ijqnZvsruMHGTVp4h95L2NKa/t+1/WbSQhBJJJWUUlFLRJZJETIg2QbI2IASSNU303Ojje7lFxhVi0pSadpU7+GfFHNr4ZXuttsIxz8vqQWOxdkUsNSjRoxtGK98pc5PxZtO71H7bl6sfm/wD1cxdOBs+x6HDTT5yz93L+eIVfAAqAAAAAAAAAAAAAAAAAAAGnbYn/AIeraq7UajvSqPKMG9adR8lfSWlnZ2td7iWe1Nnwr05U589H0fULGtSRSks7L+p9PDzNUxmLxGzqjpSTqUlpCTzjHrRlyVr2i8uS4czasFiKdSEKlKSlCcbxkua8ej1unmncyJauDpyVpQhJfmin9Syq7vYSWuHoP/txXTp5L4IywsVGvT3QwL/5eC8nNfqRwe7OEoTjVp0lGUXlK8pcN043V3l6Rn7EGgKXCLCC4fsvT8D/APF/p/LztFFNoWJ7FLEVoQi51JRhCPpSm1GK828gItCnExmy94sNiJzp0Kjm6au3wyjGSTs+ByS4km1msvMy9JNtJK7bsktbkF9szC8ckuSzl5GzJFts/CqnG3N5yfiXRQAAAAAAAAAAAAAAAAAAAAAAABiN49gUsXTcJ5SS+7nbOL/VeByKNbEbIxEqWJjJ4WpK7cU5KL/zadtV60dedrqz7oWe1dl0cRTlSr041IS5S1T6p6p+KIrUKGMjJRlGSlGSTjKLTi4vNNPmisqph/8AYTE4OUv8HU77Cyu+5nlWpyed4O9mnnde9K972MtsOEuCopQmtYzTjL4PMmmNo4w5Gux25D1kTPbcPWRUZ6bTVmafvD2gUMLUnQcJ1qlO13BwjTu8+GUs2pLK9o/sYDe/tFVOMqWEalVatKos4U+vD60/kvkcnqV5Nttttttt5tt5tt82UdI2h2n4qd1SjRoLwTq1E/al9n/SazitqVa8uKtUqVZcnUk5W9laR91jDbPwlWtOMKUJ1Jy9GNOMpzflGObOtbndkOJqWnjGsPDXhynXfuWUfN5+AMYbcHD15Yql3MJzd/tKOig8m29Es+fgd/2PspUlxStKo9XyXgv3I7D2Hh8JTVPD01Bfies5PrKWrZkgAAAAAAAAAAAAAAAAAAAAAAAAAAAg0W9anN6MuQBg8VgsQ/RnY1rbm7mNrRcZShOPJVIxmvmsjoIA4LjuzTHNvg+z7EpJfB5GLqdmO03lxyaet2nl8D0cQsB5qXZDjXrb3WX6GT2f2PV006kVLwlKSX+mx6CsRA0Dd3dXEYaPDS7mkn6SpQjC/tNK795tGGwldelO5lwBQpwlzZWREAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z",
        label: "Thể thao"
    },
    {
        type: "BEAUTY",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReUYAczy2Oi1P8g12hk8xowg-RC9wEc2eh_Q&usqp=CAU",
        label: "Đồ làm đẹp"
    }
];

const ListCategories = () => {
    return (
        <ProCard>
            <Row className="bg-base">
                {categories.map((category) => {
                    return (
                        <Col key={category.type} xs={8} lg={4} className="flex justify-center items-center mt-10 mb-10">
                            <div>
                                <img src={category.imgUrl} style={{ height: 70 }} className="mb-5" />
                                <h2 className="text-center">{category.label}</h2>
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </ProCard>
    )
}

export default ListCategories;