import { RadioGroup } from '@/components/RadioGroup'
import { db } from '@/db'
import { insertUserSchema, userTable } from '@/db/schema'
import { Enum } from 'enum-plus'
import React, { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ESelect = Enum({
    Default: {
        label: 'default',
        value: 0,
        color: '#fff',
    },
    Primary: {
        label: 'primary',
        value: 1,
        color: '#409EFF',
    },
    Danger: {
        label: 'danger',
        value: 2,
        color: '#F56C6C',
    },
})
type TStatus = typeof ESelect.valueType
export default function Index() {
    const [status, setStatus] = useState<TStatus>(ESelect.Default)
    const [formData, setFormData] = useState({ name: '', age: 0 })

    async function addUser() {
        const result = insertUserSchema.safeParse(formData)
        if (!result.success) {
            alert(result.error.message)
        } else {
            await db.insert(userTable).values(result.data)
            alert('add user success! see in the studio')
        }
    }
    return (
        <SafeAreaView style={{ paddingTop: 100 }}>
            <View style={{ marginHorizontal: 20, backgroundColor: '#fff', padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: '800', marginBottom: 10 }}>Form</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <Text style={{ width: 50 }}>name: </Text>
                    <TextInput
                        style={{ borderWidth: 1, flex: 1, borderRadius: 5, height: 45 }}
                        value={formData.name}
                        onChangeText={(name) => {
                            setFormData((pre) => {
                                return {
                                    ...pre,
                                    name,
                                }
                            })
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <Text style={{ width: 50 }}>age: </Text>
                    <TextInput
                        style={{ borderWidth: 1, flex: 1, borderRadius: 5, height: 45 }}
                        keyboardType="numeric"
                        value={formData.age.toString()}
                        onChangeText={(age) =>
                            setFormData((pre) => {
                                return {
                                    ...pre,
                                    age: isNaN(Number(age)) ? age : Number(age),
                                }
                            })
                        }
                    />
                </View>
                <Button title="add user" onPress={addUser} />
            </View>
            <View style={{ marginTop: 50, alignItems: 'center' }}>
                <View
                    style={{
                        width: 300,
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                    }}
                >
                    <Text>In the terminal, press and hold Shift + M to launch Drizzle Studio.</Text>
                </View>
            </View>

            <RadioGroup
                options={ESelect.toSelect()}
                value={status}
                onChange={(val: TStatus) => {
                    setStatus(val)
                }}
                style={{ justifyContent: 'center', marginTop: 50 }}
            />
            <View style={{ marginTop: 50, alignItems: 'center' }}>
                <View
                    style={{
                        width: 200,
                        height: 100,
                        backgroundColor: ESelect.raw(status).color,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text>select value {status}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}
