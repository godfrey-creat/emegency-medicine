import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Card,
  Divider,
  Text,
} from 'react-native-paper';

import TriageForm from '../components/TriageForm/TriageForm';
import NetworkBanner from '../components/NetworkBanner/NetworkBanner';
import SyncIndicator from '../components/SyncIndicator/SyncIndicator';
import { useConnectivity } from '../hooks/useConnectivity';
import { useSync } from '../hooks/useSync';
import { useTriage } from '../context/TriageContext';
import { formatDate } from '../utils/date';

export default function HomeScreen() {
  const { state } = useTriage();

  const { isOnline } = useConnectivity();

  const {
    syncing,
    pending,
    lastSync,
  } = useSync();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {/* Network Status */}
      <NetworkBanner online={isOnline} />

      {/* Header */}
      <Text
        variant="headlineMedium"
        style={styles.title}
      >
        🚑 Paramedic Triage Intake
      </Text>

      <Text
        variant="bodyMedium"
        style={styles.subtitle}
      >
        Emergency Medical Services
      </Text>

      {/* Dashboard */}
      <Card style={styles.dashboard}>
        <Card.Content>

          <View style={styles.row}>
            <Text variant="titleMedium">
              Network
            </Text>

            <Text
              style={{
                color: isOnline
                  ? '#2E7D32'
                  : '#C62828',
                fontWeight: 'bold',
              }}
            >
              {isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.row}>
            <Text variant="titleMedium">
              Pending Sync
            </Text>

            <Text variant="titleMedium">
              {pending}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.row}>
            <Text variant="titleMedium">
              Records
            </Text>

            <Text variant="titleMedium">
              {state.records.length}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.row}>
            <Text variant="titleMedium">
              Last Sync
            </Text>

            <Text>
              {lastSync
                ? formatDate(lastSync)
                : 'Never'}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <SyncIndicator syncing={syncing} />

        </Card.Content>
      </Card>

      {/* Form */}
      <Card style={styles.formCard}>
        <Card.Content>
          <Text
            variant="titleLarge"
            style={styles.sectionTitle}
          >
            New Triage Record
          </Text>

          <TriageForm />
        </Card.Content>
      </Card>

      {/* Recent Records */}
      <Card style={styles.recordsCard}>
        <Card.Content>

          <Text
            variant="titleLarge"
            style={styles.sectionTitle}
          >
            Recent Records
          </Text>

          {state.records.length === 0 ? (
            <Text>
              No triage records available.
            </Text>
          ) : (
            state.records.map((record) => (
              <View
                key={record.id}
                style={styles.record}
              >
                <View style={styles.row}>
                  <Text
                    variant="titleMedium"
                  >
                    {record.patientName}
                  </Text>

                  <Text
                    style={{
                      color:
                        record.isSynced
                          ? '#2E7D32'
                          : '#D32F2F',
                      fontWeight: 'bold',
                    }}
                  >
                    {record.isSynced
                      ? 'Synced'
                      : 'Pending'}
                  </Text>
                </View>

                <Text>
                  {record.conditionDescription}
                </Text>

                <Text>
                  Priority {record.priority}
                </Text>

                <Divider
                  style={{
                    marginVertical: 12,
                  }}
                />
              </View>
            ))
          )}

        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  title: {
    fontWeight: 'bold',
    marginTop: 10,
  },

  subtitle: {
    color: '#666',
    marginBottom: 20,
  },

  dashboard: {
    marginBottom: 20,
  },

  formCard: {
    marginBottom: 20,
  },

  recordsCard: {
    marginBottom: 30,
  },

  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
  },

  divider: {
    marginVertical: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  record: {
    marginBottom: 15,
  },
});