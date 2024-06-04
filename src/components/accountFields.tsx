import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useTranslation } from "react-i18next";

type AccountFiledsProps = {
  form: UseFormReturn<{
    name: string;
    gender: string;
    email: string;
  }, any, undefined>
}

const AccountFileds: React.FC<AccountFiledsProps> = ({ form }) => {
  const { t } = useTranslation();

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="name">{t("full_name_label")}</Label>
            <FormControl>
              <Input
                id="name"
                type="text"
                placeholder="Charles Leclerc"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="email">Email</Label>
            <FormControl>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <Label htmlFor="gender">{t("gender")}</Label>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={t("select_gender_placeholder")} />
                </SelectTrigger>
                <SelectContent id="gender">
                  <SelectGroup>
                    <SelectItem value="male">{t("male_label")}</SelectItem>
                    <SelectItem value="female">{t("female_label")}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}

export default AccountFileds